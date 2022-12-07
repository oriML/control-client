import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AddRecordFormInputs } from '../../models/form/form.types';
import { MovementModel } from '../../models/movements/movement.model';
import { MovementSourceType, MovementType } from '../../types/movementSource.type';
import { ChildrenProps } from '../../pages/addRecordDialog/types';
import AlertModal from '../alertModal/AlertModal';
import Modal from '../modal/Modal';
import { MovementResponseModel } from '../../models/movements/movementResponse.model';

import { useTranslation } from 'react-i18next'

const initialColorsStates = -1;

interface AddRecordFormProps extends ChildrenProps {
    movement?: MovementResponseModel
}

export function AddRecordForm({ onSubmit, movement }: AddRecordFormProps) {

    const { t } = useTranslation();

    const { register, handleSubmit, watch, getValues, reset, formState: { errors } } = useForm<MovementResponseModel>();
    useEffect(() => {
        if (movement) {
            reset({
                _id: movement._id,
                category: movement.category,
                price: movement.price,
                notes: movement.notes,
                type: movement.type,
                source: movement.source,
                movementDate: movement.movementDate
            });
        }
    }, [])

    // React.useEffect(() => console.log(watch("type")));

    // const [toggleModal, setToggleModal] = React.useState<boolean>(false);

    const [selectedSourceTypeColor, setSelectedSourceTypeColor] = React.useState<number>(initialColorsStates);

    const [selectedTypeColor, setSelectedTypeColor] = React.useState<number>(initialColorsStates);


    function onSubmitForm(data: MovementResponseModel): void {
        onSubmit(data);
        reset();
        setSelectedTypeColor(initialColorsStates);
        setSelectedTypeColor(initialColorsStates);
    };

    return (
        <>

            {/* <div className="bg-gray-100 p-0 sm:p-12"> */}
            {/* <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl"> */}
            <form
                className="add-record-form"
                onSubmit={handleSubmit(onSubmitForm)}
            >
                <div className="relative z-0 w-full mb-5">
                    <div className="absolute top-0 left-0 mt-3 ml-1 text-gray-400">₪</div>

                    <input
                        {...register("price", { required: true })}
                        className={`pt-3 text-right placeholder:text-right pb-2 pl-5 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200 
                        ${errors?.price ? "border-red-500" : null}
                        `}
                        style={{ direction: "rtl" }}
                        placeholder={`${t('AddMovementFormPlaceHolderPrice')}`}
                        type="number"
                    // defaultValue={movement?.price}
                    />
                </div>

                <div className="relative z-0 w-full mb-5">
                    <input
                        {...register("notes", { required: true })}
                        className={`pt-3 text-right placeholder:text-right pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200 
                        ${errors?.notes ? "border-red-500" : null}
                        `}
                        style={{ direction: "rtl" }}
                        type="text"
                        placeholder={`${t('AddMovementFormPlaceHolderNotes')}`}
                    // defaultValue={movement?.notes}
                    />
                </div>

                <div>
                    <div className="w-full text-end text-gray-400 px-0.5">
                        {t('AddMovementFormTitleSource')}
                    </div>
                    <div className="flex justify-around text-center my-3">
                        {
                            Object.values(MovementSourceType).map((v) => (
                                typeof v === 'number' ?
                                    <div key={v}>
                                        <label
                                            className={`block w-24 cursor-pointer rounded-lg border border-gray-200 p-3
                                                hover:bg-orange-300 ${(selectedSourceTypeColor === v || (selectedSourceTypeColor === -1 && movement?.source === v)) ? 'bg-orange-300' : null} 
                                                ${errors?.source ? "border-red-600" : null}
                                                `}
                                            tabIndex={v}
                                        >
                                            <input className="sr-only"
                                                {
                                                ...register(
                                                    "source",
                                                    {
                                                        required: true,
                                                    })
                                                }
                                                type="radio" tabIndex={-1}
                                                onClick={() => setSelectedSourceTypeColor(v)}
                                                value={v}
                                            />
                                            <span className="text-sm font-medium">{t(`${MovementSourceType[v]}`)}</span>
                                        </label>
                                    </div>
                                    :
                                    null
                            ))
                        }
                    </div>
                </div>
                <div>
                    <div className="w-full text-end text-gray-400 px-0.5">
                        {t('AddMovementFormTitleType')}
                    </div>
                    <div className="flex justify-around text-center my-3">
                        {
                            Object.values(MovementType).map((v) => (
                                typeof v === 'number' ?
                                    <div key={v}>
                                        <label
                                            className={`block w-24 cursor-pointer rounded-lg border border-gray-200 p-3 hover:bg-green-300
                                                 ${(selectedTypeColor === v || (selectedTypeColor === -1 && movement?.type === v)) ? 'bg-green-300' : null} 
                                                 ${errors?.type ? "border-red-600" : null}
                                                 `}
                                            tabIndex={v}
                                        >
                                            <input
                                                className="sr-only"
                                                {
                                                ...register(
                                                    "type",
                                                    {
                                                        required: true,
                                                    })
                                                }
                                                type="radio"
                                                tabIndex={-1}
                                                onClick={() => setSelectedTypeColor(v)}
                                                value={v}
                                            />
                                            <span className="text-sm font-medium">{t(`${MovementType[v]}`)}</span>
                                        </label>
                                    </div>
                                    :
                                    null
                            ))
                        }
                    </div>
                </div>

                <div>
                    <div className="w-full text-end text-gray-400 px-0.5">
                        {t('AddMovementFormTitleDate')}
                    </div>
                    <div className="flex items-center justify-center m-auto">
                        <div className={`datepicker mb-3 xl:w-96 ${errors?.movementDate ? "border-red-500" : null}`}>
                            <input type="date"
                                {
                                ...register(
                                    "movementDate",
                                    {
                                        required: true,
                                    })
                                }
                                className="form-control text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 p-2 w-full focus:text-gray-700 focus:bg-white focus:border-yellow-200 focus:outline-none"

                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full cursor-pointer px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-green-500 hover:bg-green-600 hover:shadow-lg focus:outline-none"
                >
                    {t('AddMovementFormSubmitButton')}
                </button>
            </form>
            {/* </div> */}
            {/* </div> */}
        </>
    );
}