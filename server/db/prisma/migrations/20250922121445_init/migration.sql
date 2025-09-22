-- CreateTable
CREATE TABLE "public"."comments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "workspace_id" VARCHAR(64) NOT NULL,
    "text" TEXT NOT NULL,
    "author_id" VARCHAR(128) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_comments_workspace" ON "public"."comments"("workspace_id");

-- CreateIndex
CREATE INDEX "idx_comments_workspace_created_at" ON "public"."comments"("workspace_id", "created_at");
