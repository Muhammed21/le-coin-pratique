import { defineStore } from 'pinia'

interface Snippet {
  id: string;
  content: string;
}

interface SnippetState {
  snippets: Record<string, string>;
}

export const useSnippetStore = defineStore('snippetStore', {
  state: (): SnippetState => ({
    snippets: {},
  }),
  actions: {
    saveSnippet(id: string, content: string): void {
      const snippet: Snippet = { id, content };
      localStorage.setItem(`snippet_${id}`, JSON.stringify(snippet));
      this.snippets[id] = content;
    },
    getSnippet(id: string): string {
      if (this.snippets[id]) return this.snippets[id];
      const storedSnippet = localStorage.getItem(`snippet_${id}`);
      return storedSnippet ? JSON.parse(storedSnippet).content : '';
    },
    removeSnippet(id: string): void {
      localStorage.removeItem(`snippet_${id}`);
      delete this.snippets[id];
    },
  },
});
