import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, ElementRef, inject, input } from '@angular/core';
import { useFrameHeader } from '@core/signals';
import { NzAnchorComponent, NzAnchorLinkComponent } from 'ng-zorro-antd/anchor';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MarkdownComponent } from 'ngx-markdown';
import 'prismjs';
import 'prismjs/components/prism-json.min.js';
import 'prismjs/components/prism-typescript.min.js';

@Component({
  selector: 'app-md-viewer',
  imports: [MarkdownComponent, NzAnchorComponent, NzAnchorLinkComponent, NgTemplateOutlet],
  templateUrl: './md-viewer.html',
  styleUrl: './md-viewer.less',
})
export class MdViewer {
  #msg = inject(NzMessageService);
  #host = inject(ElementRef);
  #fheader = useFrameHeader();
  docPath = input('');
  fullDocPath = computed(() => {
    const path = this.docPath();
    return `docs/${this.#fheader?.store.locale}/${path}.md`;
  });

  anchorList: any[] = [];

  handleError(e: string | Error) {
    this.#msg.error(typeof e === 'string' ? e : e.message);
  }
  handleReady() {
    // 渲染完成后，从 DOM 中抓取所有带 ID 的标题
    const host = this.#host.nativeElement as HTMLElement;
    const headings: NodeListOf<HTMLHeadingElement> = host.querySelectorAll(
      'markdown h2, markdown h3, markdown h4, markdown h5, markdown h6, markdown h7',
    );
    this.anchorList = [];
    let list: any[] = [this.anchorList];

    Array.from(headings).forEach((h: HTMLHeadingElement, index: number) => {
      const level = parseInt(h.tagName.replace('H', ''), 10);
      list = list.slice(0, level - 1);
      h.id = `${h.tagName}-${index}-${h.innerText}`;
      let node: any = { id: h.id, text: h.innerText, level };
      if (!list[level - 2]) {
        const children: any = [node];
        list.push(children);
        list[level - 3][list[level - 3].length - 1].children = children;
      } else {
        list[level - 2].push(node);
      }
    });
  }
}
