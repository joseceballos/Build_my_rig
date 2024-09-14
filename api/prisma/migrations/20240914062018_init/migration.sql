/*
  Warnings:

  - You are about to drop the column `componentTypeId` on the `ProductRange` table. All the data in the column will be lost.
  - You are about to drop the column `componentTypeId` on the `SpecificationType` table. All the data in the column will be lost.
  - You are about to drop the `Component` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ComponentSpecification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ComponentType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_familyId_fkey";

-- DropForeignKey
ALTER TABLE "ComponentSpecification" DROP CONSTRAINT "ComponentSpecification_componentId_fkey";

-- DropForeignKey
ALTER TABLE "ComponentSpecification" DROP CONSTRAINT "ComponentSpecification_specificationId_fkey";

-- DropForeignKey
ALTER TABLE "ProductRange" DROP CONSTRAINT "ProductRange_componentTypeId_fkey";

-- DropForeignKey
ALTER TABLE "SpecificationType" DROP CONSTRAINT "SpecificationType_componentTypeId_fkey";

-- AlterTable
ALTER TABLE "ProductRange" DROP COLUMN "componentTypeId",
ADD COLUMN     "productTypeId" INTEGER;

-- AlterTable
ALTER TABLE "SpecificationType" DROP COLUMN "componentTypeId",
ADD COLUMN     "productTypeId" INTEGER;

-- DropTable
DROP TABLE "Component";

-- DropTable
DROP TABLE "ComponentSpecification";

-- DropTable
DROP TABLE "ComponentType";

-- CreateTable
CREATE TABLE "ProductType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ProductType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "familyId" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductSpecification" (
    "productId" INTEGER NOT NULL,
    "specificationId" INTEGER NOT NULL,

    CONSTRAINT "ProductSpecification_pkey" PRIMARY KEY ("productId","specificationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductType_name_key" ON "ProductType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productId_key" ON "Product"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_model_key" ON "Product"("model");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecificationType" ADD CONSTRAINT "SpecificationType_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "ProductType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRange" ADD CONSTRAINT "ProductRange_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "ProductType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSpecification" ADD CONSTRAINT "ProductSpecification_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSpecification" ADD CONSTRAINT "ProductSpecification_specificationId_fkey" FOREIGN KEY ("specificationId") REFERENCES "Specification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
