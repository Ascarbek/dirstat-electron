<script lang="ts">
  import { onMount } from 'svelte';
  import Table from './components/Table.svelte';
  import type { IFieldMap } from './components/data';

  let list: IFieldMap[] = [];
  let columns: string[] = ['name', 'size','percent', 'type'];
  let fields: IFieldMap = {
    name: {
      title: 'Name',
      type: 'string',
    },
    size: {
      title: 'Size',
      type: 'number',
    },
    percent: {
      title: '%',
      type: 'string',
    },
    type: {
      title: 'Type',
      type: 'string',
    },
  };

  let filesCount = 0;
  let foldersCount = 0;

  const startScan = async () => {
    await window.myAPI.readFolder('/Users/ascarbek/Downloads/');
  };

  onMount(() => {
    startScan();

    const interval = setInterval(async () => {
      const status = await window.myAPI.getStatus();

      filesCount = status.fileCount;
      foldersCount = status.folderCount;

      const files = await window.myAPI.getFolderFilesMap();

      list = [];
      files[Object.keys(files)[0]].forEach((r) => {
        const obj: IFieldMap = {};
        obj['name'] = { title: 'Name', type: 'string', value: r.name };
        obj['size'] = { title: 'Size', type: 'number', value: r.size };
        obj['percent'] = { title: 'Percent', type: 'string', value: 100 };
        obj['type'] = { title: 'Type', type: 'string', value: r.type };

        list.push(obj);
      });
    }, 100);
  });

  let deltaX = 0;
  let deltaY = 0;

  const onWheel = (e) => {
    deltaX+=e.deltaX;
    deltaY+=e.deltaY;
  }
</script>

<div class="w-screen h-screen overflow-hidden flex flex-col bg-black text-neutral-300">
  <div class="py-4 px-8 flex items-center justify-end bg-neutral-900">
    <div class="flex items-center mr-4">
      <span class="mr-2">Files:</span>
      <span>{filesCount}</span>
    </div>
    <div class="flex items-center">
      <span class="mr-2">Folders:</span>
      <span>{foldersCount}</span>
    </div>
  </div>

  <div class="relative">
    <div class="absolute" style="{`transform: translateX(${-deltaX}px)`}">
  <Table rows="{list}" fields="{fields}" columns="{columns}" on:wheel={onWheel} deltaY="{deltaY}"/>
    </div>
  </div>
</div>
