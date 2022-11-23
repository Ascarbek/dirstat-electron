<script lang="ts">
  import type { IFieldMap } from './data';
  export let rows: IFieldMap[] = [];
  export let fields: IFieldMap = {};
  export let columns: string[] = [];
  export let columnSizes = [600, 100, 150, 100];
  export let deltaY = 0;

  let movingColumn = -1;

  const onMouseMove = (e) => {
    columnSizes[movingColumn] += e.movementX;
  };

  const onMouseUp = (e) => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  const onColMouseDown = (e, index) => {
    movingColumn = index;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };
</script>

<div on:wheel class="overflow-hidden flex bg-neutral-800 border border-neutral-700 px-4 py-1 border-l-0 border-t-0 border-r-0">
  {#each columns as name, index}
    <div style="{`width: ${columnSizes[index]}px`}" class="column">{fields[name].title}</div>
    <div on:mousedown="{(e) => onColMouseDown(e, index)}" class="px-1.5 cursor-col-resize">
      <div class="w-[1px] bg-neutral-600 h-full"></div>
    </div>
  {/each}
</div>

<div on:wheel class="list overflow-y-auto" >
  {#each rows as row, index}
    <!--style="{`transform: translateY(${-deltaY}px)`}"-->
    <div class="flex items-center even:bg-neutral-900 odd:bg-neutral-800 text-xs px-4" >
      {#each columns as name, index}
        <div
          style="{`width: ${columnSizes[index]}px`}"
          class="{`column ${fields[name].type === 'number' ? 'text-right' : ''}`}"
        >
          {row[name].value}
        </div>
        <div class="px-1.5">
          <div class="w-[1px] h-full"></div>
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .column {
    @apply overflow-hidden overflow-ellipsis whitespace-nowrap px-2 py-1;
  }

  .list {
    height: calc(100vh - 200px);
  }
</style>
