// 丸見え資金_demoデータ.xlsx（journal.json に変換済み）をローカルDBへ取り込むデモ用スクリプト
import { PrismaClient } from '@prisma/client';
import fs from 'node:fs';

const rows = JSON.parse(fs.readFileSync(process.argv[2], 'utf-8'));
const prisma = new PrismaClient();

const EXPENSE = {
  '備品・消耗品費': ['equipment-supplies', '備品・消耗品費'],
  事務所費: ['office-expenses', '事務所費'],
  人件費: ['personnel-costs', '人件費'],
  組織活動費: ['organizational-activities', '組織活動費'],
};

const org = await prisma.politicalOrganization.upsert({
  where: { slug: 'test-office' },
  update: {},
  create: { slug: 'test-office', displayName: 'テスト事務所', description: '丸見え資金デモデータ（令和8年）' },
});
await prisma.transaction.deleteMany({ where: { politicalOrganizationId: org.id } });

for (const r of rows) {
  const year = Number(r.date.slice(0, 4));
  const isLoan = r.cAcc === '短期借入金';
  const [categoryKey, debitAccount] = isLoan ? ['loans', r.dAcc] : EXPENSE[r.dSub] ?? ['other-expenses', r.dSub || r.dAcc];
  await prisma.transaction.create({
    data: {
      politicalOrganizationId: org.id,
      transactionNo: `D${year}-${String(r.no).padStart(4, '0')}`,
      transactionDate: new Date(r.date),
      financialYear: year,
      transactionType: isLoan ? 'income' : 'expense',
      debitAccount,
      debitAmount: r.dAmt,
      creditAccount: isLoan ? '借入金' : '普通預金', // 元データは未払金だが、デモでは普通預金から支払った扱い
      creditAmount: r.cAmt,
      description: r.memo,
      categoryKey,
      friendlyCategory: r.memo || null,
    },
  });
}
await prisma.balanceSnapshot.deleteMany({ where: { politicalOrganizationId: org.id } });
await prisma.balanceSnapshot.create({
  data: { politicalOrganizationId: org.id, snapshotDate: new Date('2025-12-31'), balance: 0 },
});
await prisma.balanceSnapshot.create({
  data: { politicalOrganizationId: org.id, snapshotDate: new Date('2026-04-30'), balance: 900000 - rows.filter((r) => r.cAcc !== '短期借入金').reduce((s, r) => s + r.dAmt, 0) },
});
console.log('imported', rows.length, 'rows; org id', org.id.toString());
await prisma.$disconnect();
