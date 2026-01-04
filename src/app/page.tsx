import { auth } from "@/auth";
import Image from "next/image";
import PostResolutionButton from "@/components/PostResolutionButton";
import { Post } from "@/libs/post";

/** ロゴ（白 / 黒 自動切替） */
function Logo() {
  return (
    <div className="relative w-24 h-8">
      {/* Light mode */}
      <Image
        src="/uniproject_black.png"
        alt="Uniproject"
        fill
        className="object-contain block dark:hidden"
        priority
      />

      {/* Dark mode */}
      <Image
        src="/Uniproject_white.png"
        alt="Uniproject"
        fill
        className="object-contain hidden dark:block"
        priority
      />
    </div>
  );
}

export default async function Home() {
  const session = await auth();
  // const allPosts = await Post.findAll();
  return (
    <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 font-fude">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm shadow-sm border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-stone-800 dark:text-stone-100">
            2026年の抱負
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 font-sans">
          <span>Powered by</span>
          <Logo />
        </div>
      </header>

      {/* Main */}
      <main className="grow px-6 py-12">
        {/* Hero */}
        <section className="text-center space-y-8 mb-20">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-50 tracking-wide">
              新年あけましておめでとうございます
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              2026年の抱負を、言葉にして残しましょう。
            </p>
          </div>
          <PostResolutionButton sessionExists={!!session} />
        </section>

        {/* List : 横3・縦無限 */}
        <section
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >
          <article className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="mb-6">
              <div className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2 tracking-widest uppercase">
                Resolution
              </div>
              <div className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-4 border-b border-stone-100 dark:border-stone-700 pb-2">
                毎日コードを書く！
              </div>
              <div className="text-stone-600 dark:text-stone-300 leading-loose text-sm">
                人と関わってより色々な知識を共有したり、新しいツールや新しいコードのテンプレートなど作っていったりすることができたらいいなと、思います。
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-400 dark:text-stone-500 pt-4 mt-auto">
              <span className="font-medium">Takoyaki</span>
              <time className="font-sans">2026.01.01</time>
            </div>
          </article>

          <article className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="mb-6">
              <div className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2 tracking-widest uppercase">
                Resolution
              </div>
              <div className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-4 border-b border-stone-100 dark:border-stone-700 pb-2">
                新しい技術に挑戦する
              </div>
              <div className="text-stone-600 dark:text-stone-300 leading-loose text-sm">
                新しい技術に挑戦することで、より良いコードを書くことができると思います。
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-stone-400 dark:text-stone-500 pt-4 mt-auto">
              <span className="font-medium">Uniproject</span>
              <time className="font-sans">2026.01.02</time>
            </div>
          </article>

          {/* ここから先、article を増やすだけで自動で縦に増える */}
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-stone-400 dark:text-stone-600 border-t border-stone-200 dark:border-stone-800 mt-16 font-sans">
        <div className="mb-2">Copyright &copy; 2026 Uniproject</div>
      </footer>
    </div>
  );
}
