import { z } from 'zod'

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc'
import { ChatCompletionRequestMessage, Configuration, CreateChatCompletionResponse, OpenAIApi } from 'openai'
import { ResultAlodok } from './alodok'
import { HaloResult } from './halodoc'
import { prisma } from '../prisma'
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)
interface Product {
  store: string
  name: string
  price: number
  image_url: string
  url: string
}
const BASE_CONFIG = `You are a doctor named Langga you answer always in bahasa indonesia when you give a drug use format {{drug name}}`
export const aiRouter = createTRPCRouter({
  complaint: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        year: z.number(),
        complaint: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      let newConversation = await prisma.conversation.create({
        data: {
          userId: ctx.user.id,
          complaint: input.complaint,
          name: input.name,
          year: input.year,
        },
      })
      let gpt = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `${BASE_CONFIG}
              Patient Name: ${input.name}
              Patien Born Year: ${input.year}`,
          },
          {
            role: 'user',
            content: input.complaint
          }
        ],
      })
      console.log(gpt.data.choices)
      await prisma.chatMessage.create({
        data: {
          conversation_id: newConversation.id,
          role: 'user',
          content: input.complaint,
        },
      })
      if (gpt.data.choices.length > 0) {
        await prisma.chatMessage.create({
          data: {
            conversation_id: newConversation.id,
            role: 'assistant',
            content: gpt.data.choices[0]?.message?.content!,
          },
        })
      }

      return {
        conversation_id: newConversation.id,
      }
    }),
  ask: protectedProcedure
    .input(z.object({ text: z.string(), conversation_id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      let conv = await prisma.conversation.findFirst({
        where: {
          id: input.conversation_id,
          userId: ctx.user.id
        }
      })
      if(!conv) throw new Error(' could not find conversation')
      let messages  = [
        {
          role: 'system',
          content: `${BASE_CONFIG}
            Patient Name: ${conv?.name}
            Patien Born Year: ${conv?.year}`,
        }
      ]
      let chatMessage = await prisma.chatMessage.findMany({
        where: {
          conversation_id: conv.id
        }
      })
      chatMessage.forEach((msg) => {
        messages.push({
          role: msg.role,
          content: msg.content
        })
      })
      messages.push({
        role: 'user',
        content: input.text
      })
      let gpt = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: messages as any,
      })
      await prisma.chatMessage.create({
        data: {
          conversation_id: conv.id,
          role: 'user',
          content: input.text,
        },
      })
      if (gpt.data.choices.length > 0) {
        await prisma.chatMessage.create({
          data: {
            conversation_id: conv.id,
            role: 'assistant',
            content: gpt.data.choices[0]?.message?.content!,
          },
        })
      }

      return {
        response: gpt.data.choices[0]?.message?.content,
      }
    }),
  history: protectedProcedure
    .input(
      z.object({
        conversation_id: z.number(),
      }),
    )
    .query(async ({ input,ctx }) => {
      let [conversation, messages] = await Promise.all([
        prisma.conversation.findFirst({where: {id: input.conversation_id}}),
        prisma.chatMessage.findMany({where: {conversation_id: input.conversation_id}})
      ])
      return {
        conversation,
        messages
      }
    }),












    
  product: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      if (input.name.length < 4) return null
      let productDB = await prisma.drug.findFirst({
        where: {
          name: input.name,
        },
      })
      let gpt: any = null
      if (productDB == null) {
        gpt = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `description of  this drug ${input.name} in bahasa indonesia`,
            },
          ],
        })
      }
      let [alo, halo] = await Promise.all([
        fetch(
          `https://www.alodokter.com/api/aloshop/products?term=${input.name}&page=1&per=18&category=`,
        ),
        fetch(
          `https://magneto.api.halodoc.com/api/v1/buy-medicine/products/search/${input.name}?page=1&per_page=10`,
        ),
      ])

      let aloRes = (await alo.json()) as ResultAlodok
      let haloRes = (await halo.json()) as HaloResult
      let product: Product[] = []
      
      aloRes.result?.data?.forEach((data) => {
        product.push({
          name: data.name,
          price: data.price.amount,
          store: 'alodokter',
          image_url: data.thumbnail_image,
          url: `https://www.alodokter.com/aloshop/products/${data.name}/${data.id}`,
        })
      })
      haloRes.result?.forEach((data) => {
        product.push({
          name: data.name,
          price: data.base_price,
          store: 'halodok',
          image_url: data.image_url,
          url: `https://www.halodoc.com/obat-dan-vitamin/${data.slug}`,
        })
      })
      if (gpt) {
        await prisma.drug.create({
          data: {
            name: input.name,
            description: gpt.data.choices[0]?.message?.content,
            products: JSON.stringify(product),
          },
        })
      }

      return {
        description: productDB
          ? productDB.description
          : gpt.data.choices[0]?.message?.content,
        products: product,
      }
    }),
})
