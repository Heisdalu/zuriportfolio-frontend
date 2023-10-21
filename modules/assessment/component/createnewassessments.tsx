import React, { useState, useEffect, useContext, useRef } from 'react';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import { Add } from 'iconsax-react';
import minus from './minus.svg';
import questions_and_answers from './newlist';
import useDisclosure from '../../../hooks/useDisclosure';
import Modal from '@ui/Modal';
import { ToPushContext } from '../../../pages/super-admin/assessment/new';
import { UpdateContext } from '../../../pages/super-admin/assessment/new';
import { toast } from 'react-toastify';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';

import Image from 'next/image';
const CreateTemplate = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [newobject, setObject]: any = useContext(ToPushContext);
  const [list, setList] = useState(questions_and_answers);
  const [delModal, setDelModal] = useState(false);
  const [delQuestId, setDelQuestId] = useState(0);
  const updatelistinobj = () => {
    const newt = { ...newobject };
    newt.questions_and_answers = list;
    setObject(newt);
  };
  const handleinputQuestion = (e: any, index: number) => {
    const updatedData = [...list];
    updatedData[index].question_text = e.target.value;
    setList(updatedData);
    updatelistinobj();
  };

  const [listupdate, setListupdate]: any = useContext(UpdateContext);
  const handleinputOption = (e: any, index: number, n: number) => {
    const updatedData = [...list];
    updatedData[index].options[n] = e.target.value;
    setList(updatedData);
    updatelistinobj();
  };
  function splicearr(arr: any, index: number) {
    const resultArray = arr.slice(0, index).concat(arr.slice(index + 1));
    return resultArray;
  }
  //deleting options
  const handleDelete = (index: number, n: number) => {
    if (list[index].options.length > 1) {
      var updatedData = [...list];
      if (list[index].correct_option === list[index].options.length) {
        list[index].correct_option = 0;
      }
      const newdata = splicearr(updatedData[index].options, n);
      updatedData[index].options = newdata;
      setList(updatedData);
      updatelistinobj();
    }
  };
  //adding options
  const handleIncreaseOption = (index: number) => {
    const updatedData = [...list];
    //updatedData[indextoadd]?.options.push('')
    updatedData[index].options.push('');
    setList(updatedData);
    updatelistinobj();
  };
  const setCorrect = (value: any, index: number) => {
    const updatedData = [...list];
    updatedData[index].correct_option = Number(value);
    setList(updatedData);
    updatelistinobj();
  };
  //handling Adding questions
  const handleAddquestion = () => {
    setList((list) => [
      ...list,
      {
        question_no: list.length + 1,
        question_type: 'multiple_choice',
        question_text: '',
        options: [''],
        correct_option: 0,
      },
    ]);
    updatelistinobj();
  };
  const delquest = (index: number) => {
    if (list.length > 1) {
      setDelQuestId(index);
      setDelModal(true);
    } else {
      toast.error('You have only one question, you can not delete it');
    }
  };
  const [yesdel, setYesdel] = useState(false);
  const confirmDelQuest = () => {
    setYesdel(true);
    setDelModal(false);
  };

  useEffect(() => {
    if (yesdel === true) {
      const updatedData = [...list];
      const newdata = splicearr(updatedData, delQuestId);
      newobject.questions_and_answers = newdata;
      setList(newobject.questions_and_answers);
      setYesdel(false);
    }
  }, [delModal, newobject]);

  useEffect(() => {
    if (listupdate === 'addquest') {
      setList(newobject.questions_and_answers);
      setListupdate('waiting');
    }

    if (listupdate === 'save') {
      const fixing = [...list];
      fixing.forEach((child) => {
        child.question_no = fixing.indexOf(child) + 1;
      });
      setList(fixing);
      const newt = { ...newobject };
      newt.questions_and_answers = list;
      setObject(newt);
      console.log(newobject);

      setListupdate('post');
    }
    if (listupdate === 'clear') {
      const cleared = [...list];
      while (cleared.length > 1) {
        cleared.pop();
      }
      if (cleared.length == 1) {
        cleared[0].question_text = '';
        (cleared[0].options = ['']), (cleared[0].correct_option = 0), setList(cleared);
      }
      setListupdate('waiting');
    }
  }, [listupdate, newobject, setObject, setListupdate, list]);
  return (
    <>
      <div className="flex flex-col gap-y-8">
        {delModal && (
          <Modal
            isOpen={!isOpen}
            closeModal={onOpen}
            title={'Are you sure you are deleting this question? Deleted questions can not be retrieved'}
            isCloseIconPresent={false}
            size="sm"
          >
            <div className="flex my-5 gap-2 w-full">
              <Button className="w-full flex-1" onClick={() => setDelModal(false)}>
                NO
              </Button>
              <Button className="w-full bg-red-300 flex-1" onClick={confirmDelQuest}>
                Yes
              </Button>
            </div>
          </Modal>
        )}
        {list.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full border-[1px] border-[#DFE3E6] rounded-[18px] py-10 px-6 relative text-left"
            >
              <div className="font-semibold text-[20px] text-[#1A1C1B]">{`Question ${index + 1}`}</div>
              <div className="flex items-center pt-4 gap-x-4">
                <Input
                  className="flex-1 border-[#DFE3E6] border-[1px] text-[#1A1C1B] opacity-100"
                  onChange={(e) => handleinputQuestion(e, index)}
                  type="text"
                  name="question"
                  placeHolder=""
                  value={list[index].question_text}
                  intent={'default'}
                  size={15}
                />
                <div
                  className="text-white-100 bg-red-200 p-3 shadow cursor-pointer rounded hover:shadow-lg"
                  onClick={() => {
                    delquest(index);
                  }}
                >
                  Del
                </div>
              </div>
              <div className=" text-[20px] font-semibold pt-4 text-[#1A1C1B]">Answers</div>
              {list[index].options.map((opt: any, n: any) => {
                return (
                  <div key={index + '-' + n} className="pt-4 flex flex-col gap-y-[10px]">
                    <div className=" text-[18px] font-semibold  text-[#1A1C1B]">{`Option ${n + 1}`}</div>
                    <div className="flex items-center justify-between gap-x-2">
                      <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="14" cy="14.5" r="13.5" stroke="#009254" />
                      </svg>
                      <Input
                        className="flex-1 border-[#DFE3E6] border-[1px] text-[#1A1C1B] opacity-100"
                        onChange={(e) => {
                          handleinputOption(e, index, n);
                        }}
                        type="text"
                        value={opt}
                        placeHolder=""
                        intent={'default'}
                        size={15}
                      />
                      <div
                        onClick={() => {
                          handleDelete(index, n);
                        }}
                      >
                        <Image src={minus} alt="minus" width={28} height={28} />
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="pt-2">
                <Button
                  onClick={() => handleIncreaseOption(index)}
                  rightIcon={<Add color="black" />}
                  intent={'primary'}
                  size={'md'}
                  className="bg-[tansparent] text-dark-100 hover:text-dark-100 hover:bg-[transparent]"
                >
                  Add Another Option
                </Button>
              </div>
              <div className=" text-[20px] font-semibold  text-[#1A1C1B] pt-3">Choose Correct Answer</div>
              <div className="pt-4 w-full ">
                <Select
                  onValueChange={(value) => {
                    setCorrect(value, index);
                  }}
                >
                  <SelectTrigger className="w-full p-6">
                    <SelectValue placeholder={`option ${item.correct_option}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {list[index].options.map((optt: any, n: number) => {
                      return (
                        <SelectItem key={index + '-' + n} value={`${n + 1}`}>
                          Option {n + 1}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pt-10 text-center flex justify-center gap-x-3 flex-wrap">
        <Button
          onClick={handleAddquestion}
          leftIcon={<Add color="black" />}
          intent={'primary'}
          size={'md'}
          className="bg-[transparent] text-dark-100 border-2 border-[#009444]"
        >
          Add Question
        </Button>
      </div>
    </>
  );
};

export default CreateTemplate;
