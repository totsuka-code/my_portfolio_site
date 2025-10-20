import React, { useMemo, useState, useEffect, useRef } from "react";

const ACCENT = "#6E56CF";
const EMAIL = "totsukahiromu@gmail.com";
const GITHUB_URL = "https://github.com/totsuka0405";
const VISIBLE_ROWS = 2;
const worksSeed = [
  {
    slug: "kakureasobi",
    title: "隠遊 (Kakureasobi)",
    summary: "災害をテーマにした一人称脱出ゲーム。大学のグループワークで開発、実装全般を担当。",
    genre: ["Game"],
    tech: ["Unity", "C#"],
    platforms: ["PC", "WebGL"],
    releasedAt: "2024-10-01",
    status: "released",
    team: "group",
    duration: "2024年4月〜12月",
    cover: "landscape",
    role: ["Game Logic", "UI", "Build & Deploy"],
    highlights: [
      "ステージ設計とギミック実装",
      "PC / WebGL 両対応",
      "操作系の抽象化とシーン遷移",
      "当たり判定・配置の最適化"
    ],
    links: {
      website: "https://unityroom.com/games/kakureasobi",
      github: "https://github.com/totsuka0405/STI_Game/releases/tag/v1.0.2"
    },
    screenshot: {
      src: "/images/works/kakureasobi/thumb.png",
      alt: "隠遊（Kakureasobi）のメイン画面：探索シーン",
      caption: "災害現場を探索するメインシーン（PC/WebGL対応）。",
      gallery: [
        {
          src: "/images/works/kakureasobi/shot-1.png",
          alt: "仕掛けが配置された通路のシーン",
          caption: "ギミックと仕掛けを回避しながら進む場面。"
        },
        {
          src: "/images/works/kakureasobi/shot-2.png",
          alt: "エンディング画面",
          caption: "脱出成功後のエンディング表示。"
        }
      ]
    }
  },
  {
    slug: "folderdump",
    title: "FolderDump",
    summary: "フォルダ構成をテキスト/JSON/CSV/DOTで出力できるGUIツール。",
    genre: ["Tool"],
    tech: ["Python"],
    platforms: ["Windows", "macOS"],
    releasedAt: "2025-09-01",
    status: "released",
    team: "solo",
    duration: "1日",
    cover: "landscape",
    role: ["Dev", "UX"],
    highlights: [
      "大規模階層の高速走査",
      "DOT 形式による構造可視化",
      "GUIベースの簡単操作"
    ],
    links: {
      github: "https://github.com/totsuka0405/folderdump/releases/tag/v1.0.1"
    },
    screenshot: {
      src: "/images/works/folderdump/thumb.png",
      alt: "FolderDumpのメイン画面：フォルダ構成エクスポートツール",
      caption: "フォルダ構成をテキスト/JSON/CSV/DOT形式で出力するGUI。"
    }
  },
  {
    slug: "working-hours",
    title: "Working Hours Calculation App",
    summary: "実習・勤務時間を記録/自動集計する Python GUI ツール。Slack連携に対応。",
    genre: ["Tool"],
    tech: ["Python"],
    platforms: ["Desktop"],
    releasedAt: "2025-09-10",
    status: "released",
    team: "solo",
    duration: "3〜4日（2025年6月〜9月）",
    cover: "landscape",
    role: ["Dev"],
    highlights: [
      "CSV 入出力",
      "入力バリデーション",
      "Slack 連携による勤怠補助"
    ],
    links: {
      github: "https://github.com/totsuka0405/Working_hours_calculation_application/releases/tag/v1.0.0"
    },
    screenshot: {
      src: "/images/works/working-hours/thumb.png",
      alt: "Working Hours Calculation Appのメイン画面：勤務時間の記録一覧",
      caption: "勤務時間の記録・集計を行うメインビュー（CSV入出力対応）。",
      gallery: [
        {
          src: "/images/works/working-hours/shot-1.png",
          alt: "勤怠入力フォーム画面",
          caption: "日時・休憩を含む入力フォームと自動集計のプレビュー。"
        }
      ]
    }
  },
  {
    slug: "draftbox",
    title: "Draftbox",
    summary: "下書きを比較しながら書けるシンプルなWebアプリ。文字数カウントとローカル保存に対応。",
    genre: ["Web"],
    tech: ["JavaScript", "HTML", "CSS", "Supabase", "Vercel"],
    platforms: ["Web"],
    releasedAt: "2025-08-01",
    status: "released",
    team: "solo",
    duration: "4日",
    cover: "landscape",
    role: ["Front-end"],
    highlights: [
      "ローカル保存",
      "文字数カウント",
      "バージョン比較",
      "クリーンなUI"
    ],
    links: {
      website: "https://draftbox-pearl.vercel.app/",
      github: "https://github.com/totsuka0405/draftbox"
    },
    screenshot: {
      src: "/images/works/draftbox/thumb.png",
      alt: "Draftboxのメイン画面：テキスト下書きと比較ビュー",
      caption: "下書きを比較しながら編集できるメイン画面（ローカル保存対応）。"
    }
  },
  {
    slug: "memorize-face",
    title: "Memorize Face",
    summary: "顔を覚えて当てる記憶力ゲーム。軽量な演出と難易度カーブを設計。",
    genre: ["Game"],
    tech: ["Unity", "C#"],
    platforms: ["PC"],
    releasedAt: "2024-11-01",
    status: "released",
    team: "solo",
    duration: "3日",
    cover: "portrait",
    role: ["Gameplay", "UI"],
    highlights: [
      "難易度カーブ調整",
      "軽量演出",
      "複数ラウンド対応"
    ],
    links: {
      website: "https://unityroom.com/games/memorize_face",
      github: "https://github.com/totsuka0405/Memorize_Face"
    },
    screenshot: {
      src: "/images/works/memorize-face/thumb.png",
      alt: "Memorize Faceのメイン画面（縦長UI）",
      caption: "タイトル／メイン画面。縦長レイアウトに最適化。"
    }
  },
  {
    slug: "luck-or-bust",
    title: "Luck or Bust",
    summary: "数字の大小を予想して進むミニゲーム。実績解除とUI演出を実装。",
    genre: ["Game"],
    tech: ["Unity", "C#"],
    platforms: ["PC"],
    releasedAt: "2025-05-01",
    status: "released",
    team: "solo",
    duration: "4日",
    cover: "landscape",
    role: ["Gameplay"],
    highlights: [
      "シンプルなゲームループ",
      "実績解除機能",
      "UI演出"
    ],
    links: {
      website: "https://unityroom.com/games/luck_or_bust",
      github: "https://github.com/totsuka0405/Luck_or_Bust"
    },
    screenshot: {
      src: "/images/works/luck-or-bust/thumb.png",
      alt: "Luck or Bustのメイン画面：数当てゲームのプレイ画面",
      caption: "数字の大小を予想するプレイ画面。UI演出と実績解除に対応。"
    }
  },
  {
    slug: "number-slide-puzzle",
    title: "Number Slide Puzzle",
    summary: "数字スライドパズル。可解性を満たすシャッフルと軽量演出が特徴。",
    genre: ["Game"],
    tech: ["Unity", "C#"],
    platforms: ["PC", "WebGL"],
    releasedAt: "2024-11-01",
    status: "released",
    team: "solo",
    duration: "4日",
    cover: "landscape",
    role: ["Logic", "UI"],
    highlights: [
      "可解性保証付きシャッフル",
      "軽量UI演出",
      "盤面ロジック設計"
    ],
    links: {
      website: "https://unityroom.com/games/slide_puzzle_0",
      github: "https://github.com/totsuka0405/NumberSlidePuzzle"
    },
    screenshot: {
      src: "/images/works/number-slide-puzzle/thumb.png",
      alt: "Number Slide Puzzleのメイン画面：盤面とスライド操作UI",
      caption: "可解性を満たすシャッフルを実装した盤面のメイン画面（PC/WebGL）。"
    }
  },
  {
    slug: "totsuka-portfolio",
    title: "Totsuka Hiromu Portfolio",
    summary: "React・Vite・Tailwind で制作した個人ポートフォリオサイト。Web・ツール・ゲームなどの自作制作物をまとめ、GitHub と Vercel による自動デプロイを実装しています。",
    genre: ["Web"],
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Vercel"],
    platforms: ["Web"],
    releasedAt: "2025-10-14",
    status: "released",
    team: "solo",
    duration: "約1週間",
    cover: "landscape",
    role: ["Front-end", "Design", "Deploy"],
    highlights: [
      "レスポンシブデザイン対応",
      "スクロール連動ヘッダーハイライト",
      "モーダルでの画像キャプション表示",
      "GitHub と Vercel による自動デプロイ"
    ],
    links: {
      website: "https://hellowportfolio.vercel.app/",
      github: "https://github.com/totsuka0405/my_portfolio_site"
    },
    screenshot: {
      src: "/images/works/portfolio/thumb.png",
      gallery: [
        "/images/works/portfolio/thumb.png"
      ],
      captions: [
        "トップページのスクリーンショット"
      ]
    }
  }
];

// -------- Skill groups --------
const skillGroups = [
  // 言語
  {
    title: "Languages",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/codefactor.svg",
    items: [
      { name: "C#", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/csharp.svg", level: "intermediate" },
      { name: "Python", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg", level: "intermediate" },
      { name: "TypeScript", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg", level: "beginner" },
      { name: "JavaScript", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg", level: "beginner" },
    ],
  },

  // ゲームエンジン / 主要FW
  {
    title: "Game Engine / Framework",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/unity.svg",
    items: [
      { name: "Unity", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/unity.svg", level: "intermediate" },
      { name: "UGUI", iconUrl: "", level: "intermediate" },
    ],
  },

  // Unity ライブラリ（主要のみ）
  {
    title: "Unity Libraries",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/unity.svg",
    items: [
      { name: "UniTask", iconUrl: "", level: "beginner" },
      { name: "DOTween", iconUrl: "", level: "beginner" },
      { name: "UniRx", iconUrl: "", level: "beginner" },
      { name: "Zenject", iconUrl: "", level: "beginner" },
    ],
  },

  // Unity クライアント開発（実務寄りのまとめ）
  {
    title: "Unity Client Dev",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/firebase.svg",
    items: [
      { name: "API通信（Firebase/REST）", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/firebase.svg", level: "intermediate" },
      { name: "エラーハンドリング/リライアビリティ", iconUrl: "", level: "intermediate" },
      { name: "デイリーログイン/ロール機能", iconUrl: "", level: "beginner" },
      { name: "画面遷移/トランジションUI", iconUrl: "", level: "intermediate" },
      { name: "WebView 連携", iconUrl: "", level: "beginner" },
      { name: "Shader/HLSL（描画表現）", iconUrl: "", level: "beginner" },
    ],
  },

  // フロントエンド
  {
    title: "Frontend",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg",
    items: [
      { name: "React", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg", level: "beginner" },
      { name: "Tailwind", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tailwindcss.svg", level: "beginner" },
      { name: "Vite", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vite.svg", level: "beginner" },
      { name: "webpack", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/webpack.svg", level: "beginner" },
    ],
  },

  // BaaS / ホスティング
  {
    title: "Backend / BaaS / Hosting",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vercel.svg",
    items: [
      { name: "Firebase（Client）", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/firebase.svg", level: "beginner" },
      { name: "Supabase", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/supabase.svg", level: "beginner" },
      { name: "Vercel", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vercel.svg", level: "beginner" },
    ],
  },

  // コラボレーション / PM
  {
    title: "Collaboration / PM",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/jira.svg",
    items: [
      { name: "Jira", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/jira.svg", level: "beginner" },
      { name: "Backlog", iconUrl: "https://www.svgrepo.com/show/379800/backlog.svg", level: "beginner" },
      { name: "Slack", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/slack.svg", level: "beginner" },
    ],
  },

  // バージョン管理（ツール含む）
  {
    title: "Version Control",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/git.svg",
    items: [
      { name: "Git", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/git.svg", level: "intermediate" },
      { name: "GitHub", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg", level: "intermediate" },
      { name: "SourceTree", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/sourcetree.svg", level: "beginner" },
      { name: "Fork", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/git.svg", level: "beginner" },
    ],
  },

  // エディタ / IDE
  {
    title: "Editors / IDE",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/gnometerminal.svg",
    items: [
      { name: "Visual Studio", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/visualstudio.svg", level: "intermediate" },
      { name: "VS Code", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/visualstudiocode.svg", level: "intermediate" },
    ],
  },

  // データ/フォーマット
  {
    title: "Data / Formats",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/json.svg",
    items: [
      { name: "JSON / CSV", iconUrl: "", level: "intermediate" },
    ],
  },

  // Office
  {
    title: "Office",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoftoffice.svg",
    items: [
      { name: "Word", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoftword.svg", level: "beginner" },
      { name: "Excel", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoftexcel.svg", level: "beginner" },
      { name: "PowerPoint", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoftpowerpoint.svg", level: "beginner" },
    ],
  },

  // デザイン
  {
    title: "Design / Prototyping",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/figma.svg",
    items: [
      { name: "Figma", iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/figma.svg", level: "beginner" }
    ],
  },
];

function classNames(...ns) { return ns.filter(Boolean).join(" "); }

function useReveal() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return { ref, show };
}

function useWorkFacets(data) {
  return useMemo(() => {
    const years = new Set();
    const genres = new Set();
    const techs = new Set();
    data.forEach((w) => {
      years.add(new Date(w.releasedAt).getFullYear());
      w.genre.forEach((g) => genres.add(g));
      w.tech.forEach((t) => techs.add(t));
    });
    return { years: Array.from(years).sort((a, b) => b - a), genres: Array.from(genres).sort(), techs: Array.from(techs).sort() };
  }, [data]);
}

function Chip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "px-3 py-1.5 rounded-full text-sm transition-all border",
        "motion-reduce:transition-none",
        active
          ? "bg-white text-gray-900 border-transparent shadow-[inset_0_0_0_2px_rgba(110,86,207,.35)]"
          : "bg-transparent text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900"
      )}
    >
      {children}
    </button>
  );
}

function FacetRow({ label, items, selected, onToggle }) {
  return (
    <div className="mt-3">
      <div className="text-xs text-gray-600 mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const v = item;
          const isActive = selected.includes(v);
          return (
            <Chip key={String(v)} active={isActive} onClick={() => onToggle(v)}>
              {String(v)}
            </Chip>
          );
        })}
      </div>
    </div>
  );
}

function PhoneMock({ children }) {
  return (
    <div className="relative h-full w-auto aspect-[9/16] max-h-[88%]" aria-hidden={false}>
      <div className="absolute inset-0 rounded-[22px] bg-white/90 border border-black/10 shadow-[inset_0_0_0_1px_rgba(0,0,0,.04),0_8px_30px_rgba(0,0,0,.16)]"/>
      <div className="absolute inset-[4px] rounded-[18px] bg-gradient-to-b from-gray-100 to-gray-50"/>
      <div className="absolute inset-[8px] rounded-xl overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(110,86,207,.20),transparent_35%),radial-gradient(circle_at_70%_60%,rgba(34,195,230,.20),transparent_35%)] grid place-items-center">
        {children ? children : <span className="text-xs text-gray-600 select-none">スマホ画面イメージ</span>}
      </div>
    </div>
  );
}

function WorkCard({ w, onOpen }) {
  const isPortrait = w.cover === 'portrait';
  const shot = w.screenshot;

  return (
    <div
      className="group rounded-3xl border border-gray-200 bg-white transition-all duration-200 ease-out transform-gpu hover:shadow-[0_18px_60px_rgba(10,13,18,.12)] hover:-translate-y-0.5 hover:scale-[1.01] lg:hover:scale-[1.005] overflow-hidden motion-reduce:transform-none motion-reduce:transition-none cursor-pointer"
      onClick={() => onOpen(w)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(w);
        }
      }}
      aria-label={`${w.title} の詳細を開く`}
    >
      {/* プレビュー */}
      <div className="relative w-full aspect-[2/1] md:aspect-video bg-gray-100 overflow-hidden">
        {shot?.src || shot?.thumb || shot?.url ? (
          isPortrait ? (
            <div className="absolute inset-0 grid place-items-center p-4">
              <PhoneMock>
                <img
                  src={shot.src || shot.thumb || shot.url}
                  alt={shot.alt ?? w.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </PhoneMock>
            </div>
          ) : (
            <img
              src={shot.src || shot.thumb || shot.url}
              alt={shot.alt ?? w.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )
        ) : (
          <div className="absolute inset-0 grid place-items-center text-sm text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* 本文 */}
      <div className="p-4 md:p-5">
        <div className="flex items-start gap-2">
          <h3 className="text-base md:text-lg font-semibold text-slate-900">{w.title}</h3>
          {w.releasedAt ? (
            <span className="ml-auto text-xs md:text-sm text-slate-500">
              {new Date(w.releasedAt).toLocaleDateString('ja-JP')}
            </span>
          ) : null}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {w.genre?.map((g) => (
            <span
              key={`g-${g}`}
              className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-slate-700"
            >
              {g}
            </span>
          ))}
          {w.platforms?.map((p) => (
            <span
              key={`p-${p}`}
              className="text-[11px] px-2 py-0.5 rounded-full border border-gray-200 text-slate-700"
            >
              {p}
            </span>
          ))}
        </div>

        {w.summary ? (
          <p className="mt-2 text-sm text-slate-700 line-clamp-2">
            {w.summary}
          </p>
        ) : null}

        {Array.isArray(w.tech) && w.tech.length > 0 ? (
          <p className="mt-2 text-[12px] text-slate-500">
            <span className="font-medium text-slate-600">Tech:</span> {w.tech.join(', ')}
          </p>
        ) : null}
      </div>
    </div>
  );
}


function DetailModal({ open, onClose, w }) {
  const dialogRef = React.useRef(null);
  const firstRef = React.useRef(null);
  const lastRef = React.useRef(null);
  const prevFocus = React.useRef(null);
  const [enter, setEnter] = React.useState(false);
  const items = React.useMemo(() => {
    if (!w || !w.screenshot) return [];

    const toItem = (v, idx = 0) => {
      if (!v) return null;
      if (typeof v === "string") {
        return { src: v, alt: `${w.title}：画像${idx + 1}`, caption: undefined };
      }
      const src = v.src || v.thumb || v.url;
      if (!src) return null;
      return {
        src,
        alt: v.alt || w?.screenshot?.alt || `${w.title}：画像${idx + 1}`,
        caption: v.caption || undefined,
      };
    };

    const list = [];
    const pushIf = (v) => {
      const it = toItem(v, list.length);
      if (it && !list.some((x) => x.src === it.src)) list.push(it);
    };

    pushIf(w.screenshot);
    pushIf(w.screenshot?.src);
    pushIf(w.screenshot?.thumb);
    pushIf(w.screenshot?.url);
    if (Array.isArray(w.screenshot?.gallery)) {
      w.screenshot.gallery.forEach((g) => pushIf(g));
    }
    return list;
  }, [w]);

  // ---- ギャラリーのカーソル ----
  const [imgIdx, setImgIdx] = React.useState(0);

  React.useEffect(() => {
    if (!open) return;
    setImgIdx(0);
  }, [open, w]);

  // ---- フォーカス管理 ----
  React.useEffect(() => {
    if (open) {
      setEnter(true);
      prevFocus.current = document.activeElement;
      setTimeout(() => {
        if (firstRef.current) firstRef.current.focus();
        else if (lastRef.current) lastRef.current.focus();
      }, 0);
    } else {
      setEnter(false);
    }
    return () => {
      if (prevFocus.current && prevFocus.current.focus) prevFocus.current.focus();
    };
  }, [open]);

  // ---- キー操作（Esc / Tab / ← →）----
  React.useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      if (items.length > 1) {
        if (e.key === "ArrowRight") { e.preventDefault(); setImgIdx((p) => (p + 1) % items.length); }
        if (e.key === "ArrowLeft")  { e.preventDefault(); setImgIdx((p) => (p - 1 + items.length) % items.length); }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose, items.length]);

  if (!open || !w) return null;

  const isPortrait = w.cover === "portrait";
  const current = items[imgIdx];

  // 画像クリックで次へ
  const handleImageClick = () => {
    if (items.length <= 1) return;
    setImgIdx((p) => (p + 1) % items.length);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-0 md:p-4" aria-hidden={!open}>
      {/* 背景 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-dialog-title"
        aria-describedby="work-dialog-desc"
        ref={dialogRef}
        className={[
          "relative w-screen h-[100svh] md:w-full md:h-auto md:max-h-[90svh] md:max-w-6xl",
          "md:rounded-2xl",
          "bg-white/98 supports-[backdrop-filter]:bg-white/95",
          "border-0 md:border md:border-gray-200 md:ring-1 md:ring-black/5",
          "shadow-none md:shadow-[0_20px_80px_rgba(0,0,0,.22)] overflow-hidden",
          "transform-gpu transition-all duration-250 focus:outline-none",
          enter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          "motion-reduce:transition-none motion-reduce:translate-y-0",
          "grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-0 md:gap-8",
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 閉じる */}
        <button
          onClick={onClose}
          aria-label="閉じる"
          className="absolute top-3 right-3 h-9 w-9 z-10 rounded-full grid place-items-center
                     bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900
                     border border-gray-200 shadow-sm"
          ref={lastRef}
        >
          <span aria-hidden>×</span>
        </button>

        <p id="work-dialog-desc" className="sr-only">
          作品の詳細を表示するモーダルダイアログです。Escキーで閉じられます。
        </p>

        {/* 左：画像エリア（上に余白を確保し、画像はやや下に） */}
        <div
          className="relative bg-[#F7FAFD] md:border-r md:border-gray-100
                     flex flex-col items-center justify-start p-4 md:p-6 gap-3 min-h-0
                     pt-12 md:pt-8"
        >
          {items.length === 0 ? (
            <div className="px-3 py-1.5 rounded-lg bg-white/90 border border-white/60 shadow-sm mt-6">
              <span id="work-dialog-title" className="text-base md:text-lg font-semibold text-slate-900">
                {w.title}
              </span>
            </div>
          ) : (
            <>
              {/* 画像コンテナ：高さ上限を明示してどの画面でも崩さない */}
              <button
                type="button"
                onClick={handleImageClick}
                className="relative group outline-none w-full grid place-items-center"
                aria-label="次の画像を表示"
                title={items.length > 1 ? "画像をクリックで次へ" : undefined}
                style={{}}
              >
                <div className="w-full h-[36svh] md:h-[64svh] max-h-[64svh] md:max-h-[70svh] grid place-items-center">
                  {isPortrait ? (
                    <PhoneMock>
                      <img
                        src={current.src}
                        alt={current.alt || w.title}
                        decoding="async"
                        loading="eager"
                        className="h-full w-auto max-h-full object-contain"
                      />
                    </PhoneMock>
                  ) : (
                    <img
                      src={current.src}
                      alt={current.alt || w.title}
                      decoding="async"
                      loading="eager"
                      className="max-h-full w-auto object-contain"
                    />
                  )}
                </div>

                {items.length > 1 && (
                  <span className="absolute bottom-2 right-2 rounded-full bg-black/60 text-white text-xs px-2 py-0.5">
                    {imgIdx + 1} / {items.length}
                  </span>
                )}
              </button>

              {/* キャプション：長文でも折り返し、はみ出さない */}
              {(current.caption || current.alt) && (
                <div className="max-w-[92%] text-center text-xs md:text-sm text-gray-600 leading-snug break-words">
                  {current.caption || current.alt}
                </div>
              )}
            </>
          )}
        </div>

        {/* 右：本文（専用スクロール） */}
        <div className="min-h-0 flex flex-col">
          <div className="px-5 md:pr-8 md:pl-0 py-5 overflow-y-auto text-slate-800 leading-relaxed">
            <h1 id="work-dialog-title" className="text-xl md:text-2xl font-semibold text-slate-900">
              {w.title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              {w.genre?.map((g) => (
                <span key={g} className="text-[12px] px-2 py-0.5 rounded-full bg-gray-100 text-slate-700">
                  {g}
                </span>
              ))}
              {w.platforms?.map((p) => (
                <span key={p} className="text-[12px] px-2 py-0.5 rounded-full border border-gray-200 text-slate-700">
                {p}
                </span>
              ))}
              {w.releasedAt && (
                <span className="ml-auto text-xs text-slate-500">
                  {new Date(w.releasedAt).toLocaleDateString("ja-JP")}
                </span>
              )}
            </div>

            {/* 概要 */}
            {w.summary && (
              <>
                <h2 className="mt-4 text-lg font-semibold text-slate-900">概要</h2>
                <p className="mt-1 text-[13.5px] md:text-sm text-slate-800">{w.summary}</p>
              </>
            )}

            {/* 技術スタック・役割 */}
            {(w.tech?.length || w.role?.length || w.duration) && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  {w.tech?.length && (
                    <>
                      <h3 className="text-sm font-semibold text-slate-900">技術スタック</h3>
                      <p className="mt-2 text-[13.5px] md:text-sm text-slate-800">{w.tech.join(" / ")}</p>
                    </>
                  )}
                </div>
                <div>
                  {w.role?.length && (
                    <>
                      <h3 className="text-sm font-semibold text-slate-900">担当</h3>
                      <p className="mt-2 text-[13.5px] md:text-sm text-slate-800">{w.role.join(" / ")}</p>
                    </>
                  )}
                  {w.duration && (
                    <p className="mt-2 text-[13.5px] md:text-sm text-slate-800">
                      <span className="font-medium">期間：</span>{w.duration}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* リンク集 */}
            <div className="mt-5 flex flex-wrap gap-3">
              {[
                { key:'github', label:'GitHub' },
                { key:'website', label:'Webサイト' },
                { key:'demo', label:'デモ' },
                { key:'video', label:'動画' },
                { key:'appStore', label:'App Store' },
                { key:'playStore', label:'Google Play' },
                { key:'steam', label:'Steam' },
                { key:'itch', label:'itch.io' },
              ].map(({ key, label }) =>
                w.links?.[key] ? (
                  <a
                    key={key}
                    ref={key === 'github' ? firstRef : null}
                    className="px-4 py-2 rounded-xl border border-gray-200 hover:border-gray-300 transition
                               bg-white text-slate-800 hover:bg-gray-50 shadow-sm text-sm"
                    href={w.links[key]}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {label}
                  </a>
                ) : null
              )}
              <button
                onClick={onClose}
                className="ml-auto px-4 py-2 rounded-xl bg-gray-900 text-white hover:opacity-90 shadow-sm text-sm"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------- Tests -----------------
const TESTS_ENABLED = true;

function runSmokeTests() {
  const results = [];
  const log = (name, pass, info = "") => results.push({ name, pass, info });
  const ws = Array.isArray(worksSeed) ? worksSeed : [];
  const sg = Array.isArray(skillGroups) ? skillGroups : [];
  const toDate = (v) => new Date(v);
  const sortedNewest = [...ws].sort((a, b) => +toDate(b.releasedAt) - +toDate(a.releasedAt));
  const newest = sortedNewest[0];
  const flatSkills = sg.flatMap((g) => {
    const list = Array.isArray(g.items) ? g.items :
                 Array.isArray(g.skills) ? g.skills : [];
    return list.map((i) => (typeof i === "string" ? i : i?.name)).filter(Boolean);
  });
  const calcNewest = ws.reduce((acc, cur) => (acc && +toDate(acc.releasedAt) > +toDate(cur.releasedAt) ? acc : cur), null);
  log("T1: newest sort", newest?.slug === calcNewest?.slug, `newest=${newest?.slug}`);
  const onlyGames = ws.filter((w) => Array.isArray(w.genre) && w.genre.includes("Game"));
  const t2Pass = onlyGames.every((w) => w.genre.includes("Game")) && onlyGames.length > 0;
  log("T2: genre filter Game", t2Pass, `count=${onlyGames.length}`);
  const years = new Set(ws.map((w) => toDate(w.releasedAt).getFullYear()));
  log("T3: year facet includes 2024", years.has(2024), `years=${[...years].sort().join(",")}`);
  const q = "フォルダ".toLowerCase();
  const searchHit = ws.filter((w) =>
    [w.title, w.summary, ...(w.tech || []), ...(w.genre || [])]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
  log("T4: search Japanese summary", searchHit.some((w) => w.slug === "folderdump"), `hits=${searchHit.map((w) => w.slug).join(",")}`);
  const portraitHasMock = ws.some((w) => w.cover === "portrait");
  log("T5: portrait works exist", portraitHasMock);
  log("T6: includes Python", flatSkills.includes("Python"));
  log("T7: includes Unity", flatSkills.includes("Unity"));
  const cnt2024 = ws.filter((w) => toDate(w.releasedAt).getFullYear() === 2024).length;
  log("T8: year 2024 count >= 3", cnt2024 >= 3, `count=${cnt2024}`);
  const titlesSorted = [...ws].sort((a, b) => a.title.localeCompare(b.title));
  const t9Pass = titlesSorted.length < 2 ? true : titlesSorted[0].title <= titlesSorted[1].title;
  log("T9: title sort deterministic", t9Pass, titlesSorted.slice(0, 3).map((w) => w.title).join(" | "));
  const collabTargets = ["Jira", "Backlog", "Slack", "SourceTree"];
  const present = collabTargets.filter((t) => flatSkills.includes(t));
  const t10Pass = present.length >= 1; // 1つ以上あればOK（全部必須だと実データに依存し過ぎる）
  log("T10: some collab tools present", t10Pass, `found=${present.join(",") || "none"}`);
  const t11Pass = ws.every((w) => w.slug && w.title && w.releasedAt);
  log("T11: works minimal fields", t11Pass);
  const derivedYears = Array.from(new Set(ws.map((w) => toDate(w.releasedAt).getFullYear()))).sort((a, b) => b - a);
  const t12Pass = derivedYears.every((v, i, arr) => i === 0 || arr[i - 1] >= v);
  log("T12: derived years sorted desc", t12Pass, `years=${derivedYears.join(",")}`);

  console.table(results);
  const passCount = results.filter((r) => r.pass).length;
  return { passCount, total: results.length, results };
}


function TestBadge() {
  const [state, setState] = useState({ passCount: 0, total: 0 });
  useEffect(() => { if (!TESTS_ENABLED) return; const r = runSmokeTests(); setState({ passCount: r.passCount, total: r.total }); }, []);
  if (!TESTS_ENABLED) return null; const allPass = state.passCount === state.total && state.total > 0;
  return (
    <div className="fixed bottom-4 right-4 select-none">
      <div className="px-3 py-1.5 rounded-full text-xs font-medium border" style={{ background: allPass ? "#F0FDF4" : "#FEF2F2", color: allPass ? "#166534" : "#991B1B", borderColor: allPass ? "#86EFAC" : "#FECACA" }} title="Runtime smoke tests">Tests: {state.passCount}/{state.total}</div>
    </div>
  );
}

function SectionIcon({ src, alt }) {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white border border-gray-200 mr-2 align-[-3px] overflow-hidden">
      {src ? <img src={src} alt={alt} className="h-4 w-4 opacity-80"/> : <span className="text-xs">*</span>}
    </span>
  );
}

function SectionLead({ title, subtitle, icon }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold flex items-center justify-center">
        <SectionIcon src={icon} alt={title} />{title}
      </h2>
      {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
    </div>
  );
}

function SkillBadge({ s }) {
  const levelJa = s.level === "intermediate" ? "中級" : s.level === "advanced" ? "上級" : "初級";
  return (
    <div className="flex items-center gap-4 p-3 rounded-2xl border border-gray-200 bg-white">
      <div className="h-9 w-9 rounded-xl grid place-items-center bg-gray-50 border border-gray-200 overflow-hidden">
        {s.iconUrl ? <img src={s.iconUrl} alt={s.name} className="h-5 w-5 opacity-80"/> : <span className="text-sm">{s.name[0]}</span>}
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-gray-900">{s.name}</div>
        <div className="text-xs text-gray-600">{levelJa}</div>
      </div>
    </div>
  );
}

function SkillGroup({ group }) {
  return (
    <div className="p-5 rounded-2xl bg-white border border-gray-200">
      <h3 className="font-semibold text-gray-900 flex items-center"><SectionIcon src={group.icon} alt="" />{group.title}</h3>
      <div className="mt-3 grid gap-2">
        {group.items.map((s) => (<SkillBadge key={s.name} s={s} />))}
      </div>
    </div>
  );
}

function TypeWriter({ text, tail }) {
  const [i, setI] = useState(0);
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => setReduce(prefersReduce.matches);
    set();
    prefersReduce.addEventListener?.('change', set);
    if (prefersReduce.matches) { setI(text.length); return () => {}; }
    const id = setInterval(() => setI((v) => (v < text.length ? v + 1 : v)), 60);
    return () => { clearInterval(id); prefersReduce.removeEventListener?.('change', set); };
  }, [text]);
  return (
    <span aria-live="polite">
      <span>{text.slice(0, i)}</span>
      {i >= text.length && tail}
      {!reduce && (
        <span className="inline-block w-[1ch] align-[-4px] ml-0.5 bg-gray-900" style={{ height: '1em', opacity: (i % 2) }} aria-hidden />
      )}
    </span>
  );
}

function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-white/95 backdrop-blur">
      <div className="relative">
        <div className="absolute inset-0 blur-xl opacity-70" style={{ background: 'conic-gradient(from 0deg, #6E56CF, #22C3E6, #6E56CF)' }} />
        <div className="relative w-16 h-16 rounded-full border-4 border-gray-200" style={{ borderTopColor: ACCENT, animation: 'spin 1s linear infinite' }} />
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function CustomCursor() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const cursor = document.createElement('div');
    Object.assign(cursor.style, {
      position:'fixed', inset:'0 auto auto 0', width:'18px', height:'18px', borderRadius:'9999px', pointerEvents:'none', mixBlendMode:'multiply', background:'radial-gradient(circle, rgba(34,195,230,.8) 0%, rgba(110,86,207,.8) 70%)', transform:'translate(-50%, -50%)', zIndex:9999, transition:'transform 120ms ease-out, opacity 180ms', opacity:'0.9'
    });
    document.body.appendChild(cursor);
    let raf = 0, px = 0, py = 0, needsPaint = false;
    const paint = () => {
      needsPaint = false;
      cursor.style.left = px + 'px';
      cursor.style.top = py + 'px';
      raf = 0;
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(paint); };
    const move = (e) => { px = e.clientX; py = e.clientY; if (!needsPaint) { needsPaint = true; schedule(); } };
    const down = () => { cursor.style.transform = 'translate(-50%, -50%) scale(0.85)'; };
    const up = () => { cursor.style.transform = 'translate(-50%, -50%) scale(1)'; };
    const enter = () => { cursor.style.transform = 'translate(-50%, -50%) scale(1.25)'; };
    const leave = () => { cursor.style.transform = 'translate(-50%, -50%) scale(1)'; };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down, { passive: true });
    window.addEventListener('pointerup', up, { passive: true });
    const attachHover = () => Array.from(document.querySelectorAll('a,button,[role="button"]')).forEach((el)=>{
      el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave);
    });
    const detachHover = () => Array.from(document.querySelectorAll('a,button,[role="button"]')).forEach((el)=>{
      el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave);
    });
    attachHover();
    const mo = new MutationObserver(() => { detachHover(); attachHover(); });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      detachHover();
      mo.disconnect();
      cursor.remove();
    };
  }, []);
  return null;
}

function useSmoothNav() {
  const onNav = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return onNav;
}

function useSectionSpy(sectionIds, rootMargin = "-45% 0px -55%") {
  const [activeId, setActiveId] = useState(sectionIds?.[0] ?? null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!Array.isArray(sectionIds) || sectionIds.length === 0) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => Math.abs(0.5 - (a.intersectionRect.top + a.intersectionRect.height / 2) / window.innerHeight)
                        - Math.abs(0.5 - (b.intersectionRect.top + b.intersectionRect.height / 2) / window.innerHeight));
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { root: null, rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => io.observe(el));
    observerRef.current = io;

    return () => io.disconnect();
  }, [sectionIds, rootMargin]);

  useEffect(() => {
    const onScroll = () => {
      if (!Array.isArray(sectionIds) || sectionIds.length === 0) return;
      let bestId = activeId;
      let bestDist = Number.POSITIVE_INFINITY;
      const viewportMid = window.scrollY + window.innerHeight * 0.5;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const elMid = rect.top + window.scrollY + rect.height * 0.5;
        const dist = Math.abs(elMid - viewportMid);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = id;
        }
      }
      if (bestId && bestId !== activeId) setActiveId(bestId);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds, activeId]);

  return activeId;
}

function Header({ activeId }) {
  const navItems = [
    { id: "about",   label: "About" },
    { id: "skills",  label: "Skill" },
    { id: "works",   label: "Works" },
    { id: "contact", label: "Contact" },
  ];

  const scrollWithOffset = (el, offset = 72) => {
    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    scrollWithOffset(el, 80);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-[1140px] px-5 h-14 flex items-center gap-6">
        <a href="#top" className="font-semibold text-gray-900">Portfolio</a>
        <nav className="ml-auto flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "px-3 py-1.5 rounded-full text-sm transition",
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                ].join(" ")}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function Reveal({ as: Tag = "div", className = "", delay = 0, children, once = true, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) {
          const t = setTimeout(() => setShown(true), delay);
          if (once) io.disconnect();
          return () => clearTimeout(t);
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay, once]);

  return (
    <Tag
      ref={ref}
      className={[
        "transform-gpu transition duration-700 ease-out",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      ].join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function onNav(e, rawId, offset = 80) {
  e?.preventDefault?.();
  const id = String(rawId || "").replace(/^#/, "");
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function FontLoader() {
  useEffect(() => {
    const id = 'font-plusjakarta';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.innerHTML = `:root{--app-font:"Plus Jakarta Sans",ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial,"Noto Sans","Apple Color Emoji","Segoe UI Emoji"}
body{font-family:var(--app-font)}
:focus-visible{outline:2px solid #6E56CF; outline-offset:2px}
@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation-duration:0.001ms !important; animation-iteration-count:1 !important; transition-duration:0.001ms !important; scroll-behavior:auto !important}}`;
    document.head.appendChild(style);
  }, []);
  return null;
}

export default function Portfolio() {
  const [query, setQuery] = useState("");
  const [selGenres, setSelGenres] = useState([]);
  const [selTechs, setSelTechs] = useState([]);
  const [selYears, setSelYears] = useState([]);
  const [sort, setSort] = useState("newest");
  const [openDetail, setOpenDetail] = useState(null);
  const [showAllWorks, setShowAllWorks] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const facets = useWorkFacets(worksSeed);
  const activeId = useSectionSpy(["about", "works", "skills", "contact"]);
  const filtered = useMemo(() => {
    let list = [...worksSeed];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((w) => [w.title, w.summary, ...(w.tech || []), ...(w.genre || [])].join(" ").toLowerCase().includes(q));
    }
    if (selGenres.length) list = list.filter((w) => selGenres.every((g) => w.genre.includes(g)));
    if (selTechs.length) list = list.filter((w) => selTechs.every((t) => w.tech.includes(t)));
    if (selYears.length) list = list.filter((w) => selYears.includes(new Date(w.releasedAt).getFullYear()));
    switch (sort) {
      case "oldest": list.sort((a, b) => +new Date(a.releasedAt) - +new Date(b.releasedAt)); break;
      case "title": list.sort((a, b) => a.title.localeCompare(b.title)); break;
      default: list.sort((a, b) => +new Date(b.releasedAt) - +new Date(a.releasedAt));
    }
    return list;
  }, [query, selGenres, selTechs, selYears, sort]);

  const [cols, setCols] = useState(1);
  useEffect(() => {
    const updateCols = () => {
      const w = window.innerWidth;
      if (w >= 1024) setCols(3);
      else if (w >= 640) setCols(2);
      else setCols(1);
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  const visibleWorks = useMemo(
    () => (showAllWorks ? filtered : filtered.slice(0, cols * VISIBLE_ROWS)),
    [showAllWorks, filtered, cols]
   );

  useEffect(() => {
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) { setIsLoaded(true); return; }
    const onReady = () => setTimeout(() => setIsLoaded(true), 350);
    if (document.readyState === 'complete') onReady(); else window.addEventListener('load', onReady);
    return () => window.removeEventListener('load', onReady);
  }, []);

  // タイプライター用のテキスト
  const typeText = "totsukahiromu ";
  const typeTail = "portfolio";

  return (
    <div className="min-h-screen text-gray-900 relative">
      <FontLoader />
      <CustomCursor />
      {!isLoaded && <LoadingOverlay />}
      <div className="absolute inset-0 -z-10 bg-[#F7FAFD] bg-[radial-gradient(circle,_rgba(56,189,248,0.18)_2.8px,_transparent_2.8px)] bg-[size:38px_38px]"/>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur text-gray-900 border-b border-gray-200">
        <div className="mx-auto max-w-[1140px] px-5 flex items-center justify-between h-16">
          <a href="#top" className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-xl bg-gradient-to-br from-[#6E56CF] to-[#22C3E6]" />
            <span className="font-semibold tracking-tight">Portfolio</span>
          </a>

          {/* ▼ ここを常に表示に変更（hidden md:flex → flex） */}
          <nav className="flex items-center gap-4 sm:gap-6 text-sm overflow-x-auto">
            {[
              { id: 'about',   label: 'About'   },
              { id: 'works',   label: 'Works'   },
              { id: 'skills',  label: 'Skills'  },
              { id: 'contact', label: 'Contact' },
            ].map((item) => {
              const isActive = activeId === item.id; // ← ハッシュ無しで一致判定
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}                 // href のときだけ # を付ける
                  onClick={(e)=>onNav(e, item.id)}     // 'about' など純粋なIDで渡す
                  aria-current={isActive ? "page" : undefined}
                  className={classNames(
                    "px-2 py-1 rounded-md transition whitespace-nowrap",
                    isActive ? "text-white" : "text-gray-700 hover:text-gray-900"
                  )}
                  style={isActive ? { backgroundColor: ACCENT } : undefined}
                >
                  {item.label}
                </a>
              );
            })}

            <a
              href={GITHUB_URL}
              target="_blank" rel="noreferrer noopener"
              className="px-3 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* Helo */}
      <section
        ref={useReveal().ref}
        className={classNames(
          "relative overflow-hidden mx-auto max-w-none px-0 pt-14 pb-14 transform-gpu transition-all",
          "motion-reduce:transition-none motion-reduce:translate-y-0"
        )}
      >
        <div className="absolute inset-0 -z-10 bg-[#EAF6FF]"/>
        <div className="pointer-events-none absolute -z-10 inset-0">
          <div className="absolute w-56 h-56 rounded-full top-8 left-[8%]" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(56,189,248,0.25) 0%, rgba(56,189,248,0.12) 45%, transparent 60%)' }} />
          <div className="absolute w-72 h-72 rounded-full -top-8 right-[12%]" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(56,189,248,0.22) 0%, rgba(56,189,248,0.10) 40%, transparent 62%)' }} />
          <div className="absolute w-40 h-40 rounded-full bottom-6 left-[26%]" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(56,189,248,0.20) 0%, rgba(56,189,248,0.10) 42%, transparent 64%)' }} />
          <div className="absolute w-64 h-64 rounded-full bottom-[-24px] right-[28%]" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.08) 38%, transparent 66%)' }} />
        </div>

        <div className="mx-auto max-w-[1140px] px-5 grid place-items-center text-center">
          <h1 className="mt-4 text-[40px] md:text-[48px] font-semibold leading-tight text-gray-900">
            <TypeWriter text={typeText} tail={<span className="text-gray-500">{typeTail}</span>} />
          </h1>
          <p className="mt-3 text-gray-700 max-w-2xl">公開済みの作品と使用技術をまとめたシンプルなポートフォリオです。</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a href="#works" onClick={(e)=>onNav(e,'#works')} className="px-5 py-2.5 rounded-xl bg-gray-900 text-white hover:opacity-90 transition">Worksを見る</a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener" className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white/90 hover:bg-white transition">GitHub</a>
          </div>
        </div>
      </section>

    {/* ABOUT */}
    <Reveal as="section" id="about" className="mx-auto max-w-[1140px] px-5 py-12 scroll-mt-20">
      <SectionLead
        title="About"
        subtitle="自己紹介と制作スタンス"
        icon="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/personio.svg"
      />

      {/* 名前 */}
      <div className="mt-10 mb-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 tracking-wide">戸塚 啓夢</h2>
        <p className="text-sm text-gray-500 tracking-wider">Totsuka Hitomu</p>
      </div>

      <div className="max-w-3xl mx-auto text-center text-gray-700 leading-relaxed space-y-5">
        <p>
          プログラミングを通して「自分の手で何かを形にすること」が好きです。  
          WebアプリやWebサイト、Pythonを用いたツール、ゲームなど、興味をもったものを自由に作っています。
        </p>
        <p>
          特定の分野にこだわらず、試行錯誤を重ねながら幅広く開発に取り組んできました。  
          ゲーム制作では主にクライアント側、Web開発ではフロントエンドを触ることが多く、  
          見た目のわかりやすさや動きの心地よさを大切にしています。
        </p>
        <p>
          このサイトは、これまでに制作してきた作品をまとめたポートフォリオです。  
          学びや経験を記録しながら、少しずつ積み重ねていく場所にしたいと考えています。
        </p>
      </div>
    </Reveal>

    {/* WORKS */}
    <Reveal as="section" id="works" className="mx-auto max-w-[1140px] px-5 py-12 scroll-mt-20">
      <SectionLead
        title="Works"
        subtitle="ジャンル・技術・年代で絞り込みできます"
        icon="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/stackshare.svg"
      />

      <Reveal className="mt-6 grid gap-3 justify-items-center" delay={80}>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <input
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="検索（タイトル・概要・技術）"
            className="w-full md:w-96 border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white"
          />
          <button
            onClick={()=>{ setSelGenres([]); setSelTechs([]); setSelYears([]); setQuery(""); setSort("newest"); }}
            className="text-sm text-gray-600 underline underline-offset-4"
          >
            リセット
          </button>
          <label className="flex items-center gap-2 text-sm text-gray-600 ml-2">
            並び替え
            <select
              value={sort}
              onChange={(e)=>setSort(e.target.value)}
              className="text-sm border border-gray-200 rounded-xl px-2.5 py-2 bg-white"
            >
              <option value="newest">新しい順</option>
              <option value="oldest">古い順</option>
              <option value="title">タイトル</option>
            </select>
          </label>
        </div>

        <div className="justify-self-stretch">
          <FacetRow
            label="ジャンル"
            items={facets.genres}
            selected={selGenres}
            onToggle={(v)=>setSelGenres(selGenres.includes(v)? selGenres.filter(x=>x!==v): [...selGenres,v])}
          />
          <div className="mt-2"/>
          <FacetRow
            label="技術"
            items={facets.techs}
            selected={selTechs}
            onToggle={(v)=>setSelTechs(selTechs.includes(v)? selTechs.filter(x=>x!==v): [...selTechs,v])}
          />
          <div className="mt-2"/>
          <FacetRow
            label="年代"
            items={facets.years}
            selected={selYears}
            onToggle={(v)=>setSelYears(selYears.includes(v)? selYears.filter(x=>x!==v): [...selYears,v])}
          />
        </div>
      </Reveal>

      <Reveal className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 works-grid" delay={120}>
        {visibleWorks.map((w) => (<WorkCard key={w.slug} w={w} onOpen={setOpenDetail} />))}
        {visibleWorks.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12">該当する作品がありません。</div>
        )}
      </Reveal>

      {filtered.length > cols * VISIBLE_ROWS && (
        <Reveal className="mt-6 text-center" delay={160}>
          <button
            onClick={()=>setShowAllWorks(!showAllWorks)}
            className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50"
          >
            {showAllWorks ? '閉じる' : 'もっと見る'}
          </button>
        </Reveal>
      )}
    </Reveal>

    {/* SKILLS */}
    <Reveal as="section" id="skills" className="mx-auto max-w-[1140px] px-5 py-12 scroll-mt-20">
      <SectionLead
        title="Skills"
        subtitle="グループ別にアイコンと習熟度（初級/中級）を表示"
        icon="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/skillshare.svg"
      />
      <Reveal className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-5" delay={80}>
        {skillGroups.map((g) => (<SkillGroup key={g.title} group={g} />))}
      </Reveal>
    </Reveal>

    {/* CONTACT */}
    <Reveal as="section" id="contact" className="mx-auto max-w-[1140px] px-5 py-12 scroll-mt-20">
      <SectionLead
        title="Contact"
        subtitle="GitHub とメールでご連絡いただけます（フォームも利用可）"
        icon="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/minutemailer.svg"
      />
      <Reveal className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm" delay={80}>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="px-3 py-1.5 rounded-xl border border-gray-200 hover:border-gray-300 bg-white"
        >
          GitHub
        </a>
        <a
          href={`mailto:${EMAIL}`}
          className="px-3 py-1.5 rounded-xl border border-gray-200 hover:border-gray-300 bg-white"
        >
          {EMAIL}
        </a>
      </Reveal>

      <Reveal
        as="form"
        onSubmit={(e)=>{ e.preventDefault(); alert("送信しました。内容を確認のうえ返信いたします。"); e.currentTarget.reset(); }}
        className="mt-6 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        delay={120}
      >
        <div className="grid gap-1 text-left">
          <label className="text-sm text-gray-700">お名前</label>
          <input required className="border border-gray-200 rounded-xl px-3 py-2 bg-white"/>
        </div>
        <div className="grid gap-1 text-left">
          <label className="text-sm text-gray-700">メール</label>
          <input type="email" required className="border border-gray-200 rounded-xl px-3 py-2 bg-white"/>
        </div>
        <div className="md:col-span-2 grid gap-1 text-left">
          <label className="text-sm text-gray-700">メッセージ</label>
          <textarea rows={6} placeholder="ご用件やご感想、連絡先などをご自由にお書きください。" className="border border-gray-200 rounded-xl px-3 py-2 bg-white"/>
        </div>
        <div className="md:col-span-2 flex items-center justify-between">
          <p className="text-xs text-gray-500">※ 送信内容は確認後、メールにてご連絡いたします。</p>
          <button className="px-5 py-2.5 rounded-xl bg-gray-900 text-white hover:opacity-90">送信</button>
        </div>
      </Reveal>
    </Reveal>

    {/* モーダルの実体 */}
    <DetailModal open={!!openDetail} w={openDetail} onClose={()=>setOpenDetail(null)} />

    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-[1140px] px-5 h-16 flex items-center justify-between text-sm text-gray-600">
        <span>© {new Date().getFullYear()} Your Name</span>
        <div className="flex items-center gap-4">
          <a className="hover:text-gray-900" href={GITHUB_URL} target="_blank" rel="noreferrer noopener">GitHub</a>
          <a className="hover:text-gray-900" href="#about"   onClick={(e)=>onNav(e,'#about')}>About</a>
          <a className="hover:text-gray-900" href="#works"   onClick={(e)=>onNav(e,'#works')}>Works</a>
          <a className="hover:text-gray-900" href="#skills"  onClick={(e)=>onNav(e,'#skills')}>Skills</a>
          <a className="hover:text-gray-900" href="#contact" onClick={(e)=>onNav(e,'#contact')}>Contact</a>
        </div>
      </div>
    </footer>

    <style>{`
      /* Tailwind無効時の保険 */
      .works-grid { display: grid; gap: 1.75rem; }
      @media (min-width: 1024px) { .works-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
      @media (min-width: 640px) and (max-width: 1023.98px) { .works-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
      @media (max-width: 639.98px) { .works-grid { grid-template-columns: repeat(1, minmax(0, 1fr)); } }
    `}</style>

    {/* <TestBadge /> */}

    </div>
  );
}
