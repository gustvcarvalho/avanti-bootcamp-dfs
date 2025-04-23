/*
  Warnings:

  - A unique constraint covering the columns `[nome_categoria]` on the table `categoria` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categoria_nome_categoria_key" ON "categoria"("nome_categoria");
