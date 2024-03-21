export interface ValidateFileType {
  allowedExtension: Array<'.jpg' | '.jpeg' | '.png' | '.doc' | '.docx' | '.pdf' | '.ppt' | '.pptx' | '.xls' | '.xlsx'>;
  allowedMimetypes: Array<
    | 'application/msword'
    | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    | 'image/jpeg'
    | 'image/png'
    | 'application/pdf'
    | 'application/vnd.ms-powerpoint'
    | 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    | 'application/vnd.ms-excel'
    | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  >;

  /// Mb
  allowedSize: number;

  /// Give name to file without extension. Example : myfile | thisismydocument
  filename?: string;
}
