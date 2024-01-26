import { promises as fs } from 'fs';
import path from 'path';

import { defineConfig } from 'wmr';

const CopyExtraAssets = ({ assets } = { assets: [] }) => {
  return {
    name: 'copy-extra-assets',
    async generateBundle(_) {
      await Promise.all(
        assets.map(async (asset) => {
          this.emitFile({
            type: 'asset',
            fileName: path.join(asset.dest, path.basename(asset.src)),
            source: await fs.readFile(asset.src),
          });
        }),
      );
    },
  };
};

export default defineConfig({
  alias: {
    react: 'preact/compat',
    'react-dom': 'preact/compat',
  },
  plugins: [
    CopyExtraAssets({
      assets: ['400', '500', '600', '700'].map((weight) => ({
        src: `node_modules/@fontsource/roboto-mono/files/roboto-mono-all-${weight}-normal.woff`,
        dest: 'fonts',
      })),
    }),
  ],
  middleware: [
    async (req, res, next) => {
      const match = req.path.match(/^\/fonts\/(.*.woff)/);
      if (match) {
        const src = `node_modules/@fontsource/roboto-mono/files/${match[1]}`;
        res.end(await fs.readFile(src));
      } else {
        next();
      }
    },
  ],
});
