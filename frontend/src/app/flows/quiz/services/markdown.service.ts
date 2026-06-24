import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { marked } from 'marked';

@Injectable()
export class MarkdownService {

  constructor( private sanitizer: DomSanitizer) { }

  parseMarkdown(md: string = "") {
    const html = marked.parse(md) as string;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
