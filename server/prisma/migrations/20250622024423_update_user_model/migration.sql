/*
  Warnings:

  - You are about to drop the column `profiilePicture` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profiilePicture",
ADD COLUMN     "profilePicture" TEXT NOT NULL DEFAULT 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png';
