-- CreateTable
CREATE TABLE "todos" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "title" STRING NOT NULL,
    "completed" BOOL NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" STRING NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "todos_id_createdAt_updatedAt_createdBy_idx" ON "todos"("id", "createdAt", "updatedAt", "createdBy");
