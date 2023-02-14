/**
 * Type definitions for copy-to-clipboard
 */

interface Options {
  debug?: boolean;
  message?: string;
  format?: string; // MIME type
  onCopy?: (clipboardData: object) => void;
}

declare function copy(text: string, options?: Options): boolean;
declare namespace copy { }
export = copy;
