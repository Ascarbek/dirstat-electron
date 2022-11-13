import type { IFolderFilesMap, IFolderSizeMap, ISubFoldersMap } from '../../back/src/types/FolderData';
import './hmr';
import './main.css';
import App from './App.svelte';

declare global {
  interface Window {
    myAPI: {
      readFolder: (_path: string) => Promise<void>;
      getStatus: () => Promise<{
        folderCount: number;
        fileCount: number;
      }>;
      getFolderSizeMap: () => Promise<IFolderSizeMap>;
      getFolderFilesMap: () => Promise<IFolderFilesMap>;
      getSubFoldersMap: () => Promise<ISubFoldersMap>;
    };
  }
}

const app = new App({
  target: document.body,
});

export default app;
