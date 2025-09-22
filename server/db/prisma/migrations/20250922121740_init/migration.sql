-- CreateTable
CREATE TABLE "public"."workspaces" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(50) NOT NULL,
    "color" VARCHAR(7) NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."workspace_members" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "workspace_id" VARCHAR(64) NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" VARCHAR(16) NOT NULL,

    CONSTRAINT "workspace_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."oauth_tokens" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "workspace_id" VARCHAR(64) NOT NULL,
    "provider" VARCHAR(32) NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT,
    "expires_at" TIMESTAMP(3),

    CONSTRAINT "oauth_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."custom_agents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "workspace_id" VARCHAR(64) NOT NULL,
    "name" TEXT NOT NULL,
    "type" VARCHAR(16) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "custom_agents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."workspace_documents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "workspace_id" VARCHAR(64) NOT NULL,
    "type" VARCHAR(16) NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "url" TEXT,
    "corpus_document_id" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workspace_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."workspace_automations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "workspace_id" VARCHAR(64) NOT NULL,
    "provider" VARCHAR(32) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "config" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workspace_automations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."campaigns" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "workspace_id" VARCHAR(64) NOT NULL,
    "title" TEXT NOT NULL,
    "status" VARCHAR(16) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "workspace_members_workspace_id_idx" ON "public"."workspace_members"("workspace_id");

-- CreateIndex
CREATE INDEX "oauth_tokens_workspace_id_idx" ON "public"."oauth_tokens"("workspace_id");

-- CreateIndex
CREATE INDEX "custom_agents_workspace_id_idx" ON "public"."custom_agents"("workspace_id");

-- CreateIndex
CREATE INDEX "workspace_documents_workspace_id_idx" ON "public"."workspace_documents"("workspace_id");

-- CreateIndex
CREATE INDEX "workspace_automations_workspace_id_idx" ON "public"."workspace_automations"("workspace_id");

-- CreateIndex
CREATE INDEX "campaigns_workspace_id_idx" ON "public"."campaigns"("workspace_id");
