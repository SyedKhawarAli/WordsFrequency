import { useMemo, useState } from 'react'

type WordStat = {
  word: string
  count: number
}

const PLACEHOLDER = `Paste or type any text, article, or transcript here to see the top 20 words ranked by usage frequency.`

const tokenize = (input: string) =>
  input
    .toLowerCase()
    .match(/\p{L}+(?:'\p{L}+)?|\d+/gu) ?? []

const formatNumber = (value: number) => value.toLocaleString()

export default function App() {
  const [text, setText] = useState('')

  const { totalWords, uniqueWords, topWords } = useMemo(() => {
    const tokens = tokenize(text)
    const counts = new Map<string, number>()

    for (const token of tokens) {
      counts.set(token, (counts.get(token) ?? 0) + 1)
    }

    const sorted = [...counts.entries()].sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
    )

    return {
      totalWords: tokens.length,
      uniqueWords: counts.size,
      topWords: sorted.slice(0, 20).map<WordStat>(([word, count]) => ({
        word,
        count,
      })),
    }
  }, [text])

  const maxCount = topWords[0]?.count ?? 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
        <header className="space-y-3 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
            Word Frequency Lab
          </p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Paste text and instantly see the 20 most used words
          </h1>
          <p className="text-base text-slate-300 sm:text-lg">
            Counts are updated live as you type, making it easy to analyze
            speeches, articles, or any large chunk of text.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl shadow-slate-950/50">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-400">Input</p>
                <h2 className="text-xl font-semibold text-white">
                  Text to analyze
                </h2>
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Live
              </span>
            </div>
            <textarea
              aria-label="Text to analyze"
              placeholder={PLACEHOLDER}
              value={text}
              onChange={(event) => setText(event.target.value)}
              className="mt-4 h-[420px] w-full resize-none rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-base leading-relaxed text-slate-50 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/30"
            />
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400">
              <span>
                Total words:{' '}
                <strong className="text-slate-200">
                  {formatNumber(totalWords)}
                </strong>
              </span>
              <span>
                Unique words:{' '}
                <strong className="text-slate-200">
                  {formatNumber(uniqueWords)}
                </strong>
              </span>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-2xl shadow-slate-950/30">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-400">Results</p>
                <h2 className="text-xl font-semibold text-white">
                  Top 20 words
                </h2>
              </div>
              {maxCount > 0 && (
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Peak: {maxCount}
                </span>
              )}
            </div>

            {topWords.length === 0 ? (
              <p className="mt-8 text-sm text-slate-400">
                Start typing on the left and the most frequent words will appear
                here in real time.
              </p>
            ) : (
              <ol className="mt-6 space-y-3">
                {topWords.map(({ word, count }, index) => (
                  <li
                    key={word}
                    className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 text-slate-300">
                        <span className="font-mono text-xs text-slate-500">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-lg font-semibold text-white">
                          {word}
                        </span>
                      </div>
                      <span className="font-mono text-base text-sky-300">
                        {formatNumber(count)}
                      </span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400"
                        style={{
                          width:
                            maxCount === 0
                              ? '0%'
                              : `${(count / maxCount) * 100}%`,
                          minWidth:
                            maxCount === 0 || count === 0 ? undefined : '6%',
                        }}
                        aria-hidden
                      />
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
