export interface IComment {
  commentID?: string;
  content?: string;
  createdDate?: string;
  memberID?: string;
  memberType?: number;
  memberName?: string;
  memberAvatar?: IMemberAvatar;
  objectID?: string;
  objectType?: number;
}

export interface IMemberAvatar {
  avatarID?: string;
  avatarLink?: string;
}
