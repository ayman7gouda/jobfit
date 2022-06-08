import { NodeModel } from '@minoru/react-dnd-treeview';

import { FileProperties } from './types';

let guid = 10;

export function initGuid(nodes: NodeModel<FileProperties>[]) {
  guid = Math.max(...nodes.map((c: any) => parseInt(c.id))) + 1;
}

export function getGuid() {
  return guid++;
}

export function IconButton({
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="cursor-pointer p-1 bg-slate-200 hover:bg-slate-400 rounded-md mx-1"
      {...rest}
    >
      {children}
    </div>
  );
}

export function TextField(
  props: React.InputHTMLAttributes<HTMLInputElement> & { value?: string }
) {
  return (
    <input
      {...props}
      className="px-3 py-1 mx-1 w-80 border-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm rounded-md"
    />
  );
}

export function Select({
  children,
  ...rest
}: React.HTMLAttributes<HTMLSelectElement> & { value?: string }) {
  return (
    <select
      {...rest}
      className="block max-w-[150px] pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      {children}
    </select>
  );
}
