/*
  Warnings:

  - You are about to drop the `Bio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bio" DROP CONSTRAINT "Bio_userId_fkey";

-- DropTable
DROP TABLE "Bio";
