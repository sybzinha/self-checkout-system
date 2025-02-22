/*
  Warnings:

  - You are about to drop the column `custumerCpf` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `custumerName` on the `Order` table. All the data in the column will be lost.
  - Added the required column `customerCpf` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "custumerCpf",
DROP COLUMN "custumerName",
ADD COLUMN     "customerCpf" TEXT NOT NULL,
ADD COLUMN     "customerName" TEXT NOT NULL;
