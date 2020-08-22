import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import BaseLayout from '../../layouts/BaseLayout';
import Field from '../../components/Field/Field';
import Styles from './JobAddView-styles';
import FileInput from '../../components/FileInput/FileInput';
import Button from '../../components/Button/Button';
import { useForm } from 'react-hook-form';
import addJob from '../../api/job/addJob';
import statusOptions from '../../config/statusOptions';
import * as moment from 'moment';

const JobAddView = () => {
  const { register, handleSubmit, errors } = useForm();
  const { authContext } = useContext(AuthContext);
  const history = useHistory();

  const onFormSubmit = async (data) => {
    let formData = new FormData();

    for (let [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    formData.delete('cv');
    formData.delete('coverLetter');
    formData.append('cv', data.cv[0]);
    formData.append('coverLetter', data.coverLetter[0]);

    await addJob(formData, authContext.token);
    history.push('/job/list');
  }

  return (
    <BaseLayout>
      <Styles>
        <form className="job-form" onSubmit={handleSubmit(onFormSubmit)}>
          <Field register={register({ required: "Missing position title" })}
            error={errors.positionTitle} name="positionTitle"
            label="Position title:" type="text" maxLength="50" />
          <Field register={register({ required: "Missing location" })}
            error={errors.location} name="location"
            label="Location:" type="text" maxLength="50" />
          <Field register={register({ required: "Missing company name" })}
            error={errors.company} name="company"
            label="Company:" type="text" maxLength="50" />
          <Field register={register({ required: "Missing link" })}
            error={errors.linkToPosting} name="linkToPosting"
            label="Link to job ad:" type="url" maxLength="250" />
          <Field register={register({ required: "Missing application date" })}
            error={errors.dateApplied} name="dateApplied"
            label="Application date:" type="date" />
          <div>
            Current status:
            <select className="selector" ref={register} name="currentStatus">
              {statusOptions.map((option, index) => (
                <option value={index}>{option}</option>
              ))}
            </select>
          </div>
          <FileInput register={register} name="cv"
            id="cv" label="CV: " />
          <FileInput register={register} name="coverLetter"
            id="coverLetter" label="Cover letter: " />
          <div>
            Notes: <textarea ref={register} name="notes" maxLength="5000" />
          </div>
          <div></div>
          <Button color="green" fillBlock type="submit">Add job</Button>
        </form>
      </Styles>
    </BaseLayout>
  )
}

export default JobAddView;