declare module 'disqus-react' {
  import * as React from 'react';

  export interface DiscussionEmbedProps {
    shortname: string;
    config: {
      url?: string;
      identifier?: string;
      title?: string;
      category_id?: string;
      language?: string;
    };
  }

  export class DiscussionEmbed extends React.Component<DiscussionEmbedProps, any> {}
  export class CommentCount extends React.Component<any, any> {}
  export class CommentEmbed extends React.Component<any, any> {}
}
