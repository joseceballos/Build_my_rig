/*
  Warnings:

  - You are about to drop the column `componentTypeId` on the `Component` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_componentTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Family" DROP CONSTRAINT "Family_productRangeId_fkey";

-- DropForeignKey
ALTER TABLE "ProductRange" DROP CONSTRAINT "ProductRange_componentTypeId_fkey";

-- AlterTable
ALTER TABLE "Component" DROP COLUMN "componentTypeId";

-- AddForeignKey
ALTER TABLE "ProductRange" ADD CONSTRAINT "ProductRange_componentTypeId_fkey" FOREIGN KEY ("componentTypeId") REFERENCES "ComponentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_productRangeId_fkey" FOREIGN KEY ("productRangeId") REFERENCES "ProductRange"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
