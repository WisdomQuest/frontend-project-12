 import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
 const AddChanellModal = ({ isOpen, onClose, onSubmit }) => {

  if (!isOpen) return null;

  const initialValues = {
    chatName: ''
  };

  const validationSchema = Yup.object({
    chatName: Yup.string()
      .required('Обязательное поле')
      .min(3, 'от 3 до 20 символов')
      .max(20, 'от 3 до 20 символов')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await onSubmit(values);
      resetForm();
      onClose();
    } catch (error) {
      console.error('Ошибка создания чата:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (

    <div 
      className="modal fade show" 
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} 
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Создать новый чат</h1>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="chatName" className="form-label">
                      Название чата
                    </label>
                    <Field
                      type="text"
                      id="chatName"
                      name="chatName"
                      className={`form-control ${errors.chatName && touched.chatName ? 'is-invalid' : ''}`}
                      placeholder="Введите название чата..."
                    />
                    {errors.chatName && touched.chatName && (
                      <div className="invalid-feedback">{errors.chatName}</div>
                    )}
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Отменить
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={isSubmitting}
                  >
                    Отправить
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );

    // <div
    //   className="modal fade"
    //   id="exampleModal"
    //   tabIndex="-1"
    //   aria-labelledby="exampleModalLabel"
    //   aria-hidden="true"
    // >
    //   <div className="modal-dialog">
    //     <div className="modal-content">
    //       <div className="modal-header">
    //         <h1 className="modal-title fs-5" id="exampleModalLabel">
    //           Modal title
    //         </h1>
    //         <button
    //           type="button"
    //           className="btn-close"
    //           data-bs-dismiss="modal"
    //           aria-label="Close"
    //         ></button>
    //       </div>
    //       <div className="modal-body">...</div>
    //       <div className="modal-footer">
    //         <button
    //           type="button"
    //           className="btn btn-secondary"
    //           data-bs-dismiss="modal"
    //         >
    //           Close
    //         </button>
    //         <button type="button" className="btn btn-primary">
    //           Save changes
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  // );
};

export default AddChanellModal;
