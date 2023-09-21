export interface IActiveCardContext {
  setActiveCardId: React.Dispatch<React.SetStateAction<string>>;
  setOpenedRenameModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenedDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}
