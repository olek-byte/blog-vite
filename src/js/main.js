import { postManagement } from './modules/postManagement';
import { modalModule } from './modules/modalModule';
import { deleteModal } from './modules/deleteModal';
import { validateModule } from './modules/validateModule';

postManagement.init();
postManagement.cleanData();

modalModule.openModalWindowPost();
modalModule.closeModalWindowPost();

deleteModal.openDelModal();
deleteModal.closeDelModal();

validateModule.validate();
