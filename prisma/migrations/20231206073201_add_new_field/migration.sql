/*
  Warnings:

  - You are about to drop the column `numberRooms` on the `booking` table. All the data in the column will be lost.
  - You are about to alter the column `type` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to alter the column `paymentMode` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.
  - Added the required column `totalRooms` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` DROP COLUMN `numberRooms`,
    ADD COLUMN `totalRooms` INTEGER NOT NULL,
    MODIFY `type` VARCHAR(191) NOT NULL,
    MODIFY `paymentMode` VARCHAR(191) NOT NULL;
