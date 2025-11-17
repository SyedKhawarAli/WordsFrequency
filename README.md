# Word Frequency Analyzer

A modern, real-time word frequency analysis tool built with React and TypeScript. Paste or type any text and instantly see the top 20 most frequently used words with visual frequency bars.

## Features

- **Real-time Analysis**: Word counts update instantly as you type or paste text
- **Top 20 Words**: Automatically displays the 20 most frequent words ranked by usage
- **Visual Statistics**: 
  - Total word count
  - Unique word count
  - Visual frequency bars for each word
- **Beautiful UI**: Modern, dark-themed interface with gradient accents
- **Smart Tokenization**: Handles contractions, numbers, and Unicode characters properly

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/WordsFrequency.git
cd WordsFrequency
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

This will build the project and deploy it to GitHub Pages using the `gh-pages` package.

## How It Works

1. **Input**: Paste or type any text in the input area
2. **Tokenization**: The text is tokenized into words (handling contractions, numbers, and Unicode)
3. **Counting**: Each word is counted and sorted by frequency
4. **Display**: The top 20 words are displayed with:
   - Rank number
   - Word
   - Count
   - Visual frequency bar (proportional to the most frequent word)

## Project Structure

```
WordsFrequency/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   ├── App.css          # Component styles
│   └── index.css        # Global styles
├── public/              # Static assets
├── dist/                # Production build output
├── package.json         # Dependencies and scripts
└── vite.config.ts       # Vite configuration
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## License

This project is open source and available under the MIT License.
