export declare interface CategoryOption {
  id: string | number;
  name: string;
}
type STRORUNDEF = string | undefined;

export declare interface BlogFormFields {
  title :STRORUNDEF;
  status:STRORUNDEF | number;
  category : STRORUNDEF;
  content : STRORUNDEF
}

export declare interface BlogObject extends BlogFormFields{
  id: STRORUNDEF;
}

export declare type BlogRow = BlogObject | null;
