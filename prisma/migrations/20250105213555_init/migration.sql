-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "mfr" TEXT,
    "type_name" TEXT,
    "type_id" INTEGER,
    "style_name" TEXT,
    "style_id" TEXT,
    "color_number" INTEGER,
    "color_name" TEXT,
    "size" TEXT,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);
