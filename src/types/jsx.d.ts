/* -------------------------------------------------------------------------- */
/*             EXPLICIT JSX / REACT GLOBAL TYPE DECLARATIONS                  */
/*   This file FORCES the TypeScript language server to register React's      */
/*   JSX.IntrinsicElements namespace, preventing error TS7026 "JSX element    */
/*   implicitly has type 'any' because no interface 'JSX.IntrinsicElements'   */
/*   exists" even when module resolution / composite refs behave oddly.       */
/* -------------------------------------------------------------------------- */

/// <reference types="react" />
/// <reference types="react-dom" />

import type React from 'react'
import type {
  AriaAttributes,
  DOMAttributes,
  HTMLAttributes,
  SVGAttributes,
  CSSProperties,
} from 'react'

declare global {
  namespace JSX {
    type ElementType =
      | keyof JSX.IntrinsicElements
      | React.JSXElementConstructor<any>

    type Element = React.ReactElement<any>

    type ElementClass = React.Component<any, any>

    interface ElementAttributesProperty {
      props: any
    }

    interface ElementChildrenAttribute {
      children: any
    }

    type LibraryManagedAttributes<C, P> = React.JSX.LibraryManagedAttributes<C, P>

    type IntrinsicAttributes = React.Attributes

    interface IntrinsicClassAttributes<T>
      extends React.ClassAttributes<T> {}

    interface HTMLAnchorAttributes extends HTMLAttributes<HTMLAnchorElement> {
      download?: any
      href?: string
      hrefLang?: string
      media?: string
      ping?: string
      rel?: string
      target?: string
      type?: string
      referrerPolicy?: string
    }

    interface HTMLAudioAttributes extends HTMLAttributes<HTMLAudioElement> {
      autoPlay?: boolean
      controls?: boolean
      crossOrigin?: 'anonymous' | 'use-credentials' | ''
      loop?: boolean
      muted?: boolean
      preload?: string
      src?: string
    }

    interface HTMLVideoAttributes extends HTMLAttributes<HTMLVideoElement> {
      autoPlay?: boolean
      controls?: boolean
      crossOrigin?: 'anonymous' | 'use-credentials' | ''
      height?: number | string
      loop?: boolean
      muted?: boolean
      playsInline?: boolean
      poster?: string
      preload?: string
      src?: string
      width?: number | string
      disablePictureInPicture?: boolean
    }

    interface HTMLImgAttributes extends HTMLAttributes<HTMLImageElement> {
      alt?: string
      crossOrigin?: 'anonymous' | 'use-credentials' | ''
      decoding?: 'async' | 'auto' | 'sync'
      height?: number | string
      loading?: 'eager' | 'lazy'
      referrerPolicy?: string
      sizes?: string
      src?: string
      srcSet?: string
      useMap?: string
      width?: number | string
    }

    interface SVGElementAttributes<T> extends SVGAttributes<T> {
      className?: string
      style?: CSSProperties
    }

    /* ------------------------------ Intrinsic HTML ------------------------------ */
    interface IntrinsicElements {
      a: React.DetailedHTMLProps<HTMLAnchorAttributes, HTMLAnchorElement>
      abbr: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      address: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      area: React.DetailedHTMLProps<React.AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>
      article: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      aside: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      audio: React.DetailedHTMLProps<HTMLAudioAttributes, HTMLAudioElement>
      b: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      base: React.DetailedHTMLProps<React.BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>
      bdi: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      bdo: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      blockquote: React.DetailedHTMLProps<React.BlockquoteHTMLAttributes<HTMLElement>, HTMLElement>
      body: React.DetailedHTMLProps<HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>
      br: React.DetailedHTMLProps<React.HTMLAttributes<HTMLBRElement>, HTMLBRElement>
      button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
      canvas: React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>
      caption: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      cite: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      code: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      col: React.DetailedHTMLProps<React.ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>
      colgroup: React.DetailedHTMLProps<React.ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>
      data: React.DetailedHTMLProps<React.DataHTMLAttributes<HTMLDataElement>, HTMLDataElement>
      datalist: React.DetailedHTMLProps<HTMLAttributes<HTMLDataListElement>, HTMLDataListElement>
      dd: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      del: React.DetailedHTMLProps<React.DelHTMLAttributes<HTMLModElement>, HTMLModElement>
      details: React.DetailedHTMLProps<React.DetailsHTMLAttributes<HTMLDetailsElement>, HTMLDetailsElement>
      dfn: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      dialog: React.DetailedHTMLProps<React.DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>
      div: React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
      dl: React.DetailedHTMLProps<HTMLAttributes<HTMLDListElement>, HTMLDListElement>
      dt: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      em: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      embed: React.DetailedHTMLProps<React.EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>
      fieldset: React.DetailedHTMLProps<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>
      figcaption: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      figure: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      footer: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      form: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
      h1: React.DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
      h2: React.DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
      h3: React.DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
      h4: React.DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
      h5: React.DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
      h6: React.DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
      head: React.DetailedHTMLProps<HTMLAttributes<HTMLHeadElement>, HTMLHeadElement>
      header: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      hgroup: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      hr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement>
      html: React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>
      i: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      iframe: React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>
      img: React.DetailedHTMLProps<HTMLImgAttributes, HTMLImageElement>
      input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
      ins: React.DetailedHTMLProps<React.InsHTMLAttributes<HTMLModElement>, HTMLModElement>
      kbd: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      label: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
      legend: React.DetailedHTMLProps<React.LegendHTMLAttributes<HTMLLegendElement>, HTMLLegendElement>
      li: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
      link: React.DetailedHTMLProps<React.LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>
      main: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      map: React.DetailedHTMLProps<React.MapHTMLAttributes<HTMLMapElement>, HTMLMapElement>
      mark: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      menu: React.DetailedHTMLProps<React.MenuHTMLAttributes<HTMLMenuElement>, HTMLMenuElement>
      meta: React.DetailedHTMLProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>
      meter: React.DetailedHTMLProps<React.MeterHTMLAttributes<HTMLMeterElement>, HTMLMeterElement>
      nav: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      noscript: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      object: React.DetailedHTMLProps<React.ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>
      ol: React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>
      optgroup: React.DetailedHTMLProps<React.OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>
      option: React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>
      output: React.DetailedHTMLProps<React.OutputHTMLAttributes<HTMLOutputElement>, HTMLOutputElement>
      p: React.DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
      picture: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      pre: React.DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>
      progress: React.DetailedHTMLProps<React.ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>
      q: React.DetailedHTMLProps<React.QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>
      rp: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      rt: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      ruby: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      s: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      samp: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      script: React.DetailedHTMLProps<React.ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>
      search: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      section: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      select: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
      slot: React.DetailedHTMLProps<React.SlotHTMLAttributes<HTMLSlotElement>, HTMLSlotElement>
      small: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      source: React.DetailedHTMLProps<React.SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>
      span: React.DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
      strong: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      style: React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>
      sub: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      summary: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      sup: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      svg: React.DetailedSVGAttributes<SVGSVGElement>
      table: React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>
      tbody: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
      td: React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>
      template: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTemplateElement>, HTMLTemplateElement>
      textarea: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
      tfoot: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
      th: React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>
      thead: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>
      time: React.DetailedHTMLProps<React.TimeHTMLAttributes<HTMLTimeElement>, HTMLTimeElement>
      title: React.DetailedHTMLProps<HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>
      tr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>
      track: React.DetailedHTMLProps<React.TrackHTMLAttributes<HTMLTrackElement>, HTMLTrackElement>
      u: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      ul: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>
      var: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      video: React.DetailedHTMLProps<HTMLVideoAttributes, HTMLVideoElement>
      wbr: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      webview: React.DetailedHTMLProps<React.WebViewHTMLAttributes<HTMLWebViewElement>, HTMLWebViewElement>

      path: React.SVGProps<SVGPathElement>
      rect: React.SVGProps<SVGRectElement>
      circle: React.SVGProps<SVGCircleElement>
      line: React.SVGProps<SVGLineElement>
      polyline: React.SVGProps<SVGPolylineElement>
      polygon: React.SVGProps<SVGPolygonElement>
      ellipse: React.SVGProps<SVGEllipseElement>
      g: React.SVGProps<SVGGElement>
      text: React.SVGProps<SVGTextElement>
      tspan: React.SVGProps<SVGTSpanElement>
      use: React.SVGProps<SVGUseElement>
      defs: React.SVGProps<SVGDefsElement>
      linearGradient: React.SVGProps<SVGLinearGradientElement>
      radialGradient: React.SVGProps<SVGRadialGradientElement>
      stop: React.SVGProps<SVGStopElement>
      clipPath: React.SVGProps<SVGClipPathElement>
      mask: React.SVGProps<SVGMaskElement>
      pattern: React.SVGProps<SVGPatternElement>
      image: React.SVGProps<SVGImageElement>
    }
  }
}

export {}
