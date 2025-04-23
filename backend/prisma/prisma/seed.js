const { prisma } = require('../../src/database/prismaClient');

async function main() {
  const categorias = [
    'chaves',
    'eletrônicos',
    'documentos',
    'mochilas e bolsas',
    'óculos',
    'roupas',
    'acessórios',
    'cartões',
    'materiais escolares e de escritório',
    'livros',
    'fones de ouvido',
    'itens de entretenimento',
    'brinquedos',
    'produtos de higiene pessoal',
    'objetos de valor',
    'calçados',
    'materiais de arte',
    'câmeras e equipamentos de foto',
    'equipamentos esportivos',
    'comprovantes, recibos, ingressos',
    'outros'
  ];

  for (const nome of categorias) {
    await prisma.categoria.upsert({
      where: { nome_categoria: nome },
      update: {},
      create: { nome_categoria: nome }
    });
  }

  console.log('✅ Categorias inseridas com sucesso!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
