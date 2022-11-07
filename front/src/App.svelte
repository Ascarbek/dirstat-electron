<script context="module" lang="ts">
  import type { IFolderData } from '../../back/src/types/FolderData';
  declare global {
    interface Window {
      myAPI: {
        readFolder: (_path: string) => Promise<IFolderData[]>;
        getStatus: () => Promise<{
          folderCount: number;
          fileCount: number;
        }>;
        getScanResults: () => Promise<
          {
            path: string;
            file: string;
          }[]
        >;
      };
    }
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  let list:{path, file}[] = []

  const startScan = async () => {
    await window.myAPI.readFolder('/Users/ascarbek/Downloads/');
  }


  onMount(async () => {
   /* const interval = setInterval(async () => {

      const status = await window.myAPI.getStatus();
      console.log(status.fileCount);
    }, 100);*/

  });
</script>

<div class="min-w-screen min-h-screen bg-gradient-to-b from-blue-900 to-black md:bg-dark-100 flex flex-col">

</div>
