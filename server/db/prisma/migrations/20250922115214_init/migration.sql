-- CreateTable
CREATE TABLE "public"."texts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "workspace_id" VARCHAR(64) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "content" TEXT NOT NULL,
    "created_by" VARCHAR(128) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "texts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_texts_workspace" ON "public"."texts"("workspace_id");

-- CreateIndex
CREATE INDEX "idx_texts_workspace_created_at" ON "public"."texts"("workspace_id", "created_at");
