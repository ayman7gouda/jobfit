import { SkillsList } from 'components/SkillsList/SkillsList';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Month() {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div className="flex min-h-screen">
      <Head>
        <title>JobFit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="bg-gray-400 h-screen overflow-auto p-4">
        <SkillsList />
      </section>
      <section className="flex-1 bg-red-400">Content</section>
    </div>
  );
}
