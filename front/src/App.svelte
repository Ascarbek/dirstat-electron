<script context="module" lang="ts">
  import type { IFolderData } from '../../back/src/types/FolderData';
  declare global {
    interface Window {
      myAPI: {
        readFolder: (_path: string) => Promise<IFolderData[]>;
      };
    }
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  onMount(async () => {
    console.log(await window.myAPI.readFolder('default'));
  });
</script>

<div class="min-w-screen min-h-screen bg-gradient-to-b from-blue-900 to-black md:bg-dark-100 flex flex-col"></div>
