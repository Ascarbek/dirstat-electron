<script lang="ts">
  import type { IFieldMap } from './data';
  export let rows: IFieldMap[] = [];
  export let fields: IFieldMap = {};
  export let columns: string[] = [];
  export let columnSizes = [600, 100, 100];
</script>

<div class="flex items-center bg-neutral-800 border border-neutral-700 px-4 border-l-0 border-t-0 border-r-0">
  {#each columns as name, index}
    <div style="{`width: ${columnSizes[index]}px`}" class="column">{fields[name].title}</div>
  {/each}
</div>

<div class="list overflow-auto">
  {#each rows as row, index}
    <div class="flex items-center even:bg-neutral-900 odd:bg-neutral-800 text-xs px-4">
      {#each columns as name, index}
        <div style="{`width: ${columnSizes[index]}px`}" class="column">
          {row[name].value}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .column {
    @apply overflow-hidden overflow-ellipsis whitespace-nowrap px-2 py-2;
  }

  .list {
    height: calc(100vh - 200px);
  }
</style>
