-- AlterTable
ALTER TABLE "Component" ADD COLUMN     "familyId" INTEGER;

-- CreateTable
CREATE TABLE "ProductRange" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "componentTypeId" INTEGER NOT NULL,

    CONSTRAINT "ProductRange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "description" TEXT,
    "productRangeId" INTEGER NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductRangeProperty" (
    "productRangeId" INTEGER NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ProductRangeProperty_pkey" PRIMARY KEY ("productRangeId","propertyId")
);

-- CreateTable
CREATE TABLE "FamilySpecification" (
    "familyId" INTEGER NOT NULL,
    "specificationId" INTEGER NOT NULL,

    CONSTRAINT "FamilySpecification_pkey" PRIMARY KEY ("familyId","specificationId")
);

-- CreateTable
CREATE TABLE "FamilySpecificationType" (
    "familyId" INTEGER NOT NULL,
    "specificationTypeId" INTEGER NOT NULL,

    CONSTRAINT "FamilySpecificationType_pkey" PRIMARY KEY ("familyId","specificationTypeId")
);

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRange" ADD CONSTRAINT "ProductRange_componentTypeId_fkey" FOREIGN KEY ("componentTypeId") REFERENCES "ComponentType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_productRangeId_fkey" FOREIGN KEY ("productRangeId") REFERENCES "ProductRange"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRangeProperty" ADD CONSTRAINT "ProductRangeProperty_productRangeId_fkey" FOREIGN KEY ("productRangeId") REFERENCES "ProductRange"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRangeProperty" ADD CONSTRAINT "ProductRangeProperty_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilySpecification" ADD CONSTRAINT "FamilySpecification_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilySpecification" ADD CONSTRAINT "FamilySpecification_specificationId_fkey" FOREIGN KEY ("specificationId") REFERENCES "Specification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilySpecificationType" ADD CONSTRAINT "FamilySpecificationType_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilySpecificationType" ADD CONSTRAINT "FamilySpecificationType_specificationTypeId_fkey" FOREIGN KEY ("specificationTypeId") REFERENCES "SpecificationType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
