/*
  Warnings:

  - You are about to drop the column `onversation_id` on the `ChatMessage` table. All the data in the column will be lost.
  - Added the required column `conversation_id` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ChatMessage` DROP COLUMN `onversation_id`,
    ADD COLUMN `conversation_id` INTEGER NOT NULL;
