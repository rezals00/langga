-- AlterTable
ALTER TABLE `ChatMessage` MODIFY `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Drug` MODIFY `description` TEXT NOT NULL,
    MODIFY `products` TEXT NOT NULL;
