import {
  ArticleGrid,
  Paragraph,
  PullQuote,
  H1,
  H2,
  H3,
  TechFigure,
  DropCap,
  Code,
  Strong,
  Link,
  HR,
  UL,
  OL
} from './MagazineComponents'

/**
 * MDX Components mapping
 * Use this object to map standard MDX/Markdown elements to custom components
 * 
 * Usage with react-markdown:
 * <ReactMarkdown components={mdxComponents}>{content}</ReactMarkdown>
 * 
 * Usage with next-mdx-remote:
 * <MDXRemote {...source} components={mdxComponents} />
 */
export const mdxComponents = {
  // Typography
  p: Paragraph,
  h1: H1,
  h2: H2,
  h3: H3,
  blockquote: PullQuote,
  strong: Strong,
  em: ({ ...props }) => <em className="text-slate-400 italic" {...props} />,
  
  // Code
  code: Code,
  pre: (props: any) => <div {...props} />, // Pre is handled by Code component
  
  // Links
  a: Link,
  
  // Lists
  ul: UL,
  ol: OL,
  li: ({ ...props }) => <li className="text-slate-300" {...props} />,
  
  // Dividers
  hr: HR,
  
  // Images (standard img will use TechFigure)
  img: ({ src, alt, title }: any) => (
    <TechFigure
      src={src || ''}
      alt={alt || ''}
      caption={title}
    />
  ),
  
  // Custom components (can be used directly in MDX)
  ArticleGrid,
  TechFigure,
  DropCap,
  PullQuote
}

export default mdxComponents
