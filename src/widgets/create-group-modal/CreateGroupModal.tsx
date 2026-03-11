import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import type { GroupMember } from "@entities/group";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { closeModal } from "@features/ui/modalSlice";
import { Modal } from "@shared/ui/modal";

import { ModalHeader } from "./ui/ModalHeader";
import { ModalActions } from "./ui/ModalActions";
import { StepBasicInfo } from "./steps/StepBasicInfo";
import { StepLocation } from "./steps/StepLocation";
import { StepMembers } from "./steps/StepMembers";
import type { CreateGroupFormData } from "./types";
import { createGroupSchema } from "./validation";

const TOTAL_STEPS = 3;

const STEP_TITLES = ["Новая группа", "Место встречи", "Участники"];

const MOCK_FRIENDS: GroupMember[] = [
  { id: "1", avatar: "https://i.pravatar.cc/40?img=1" },
  { id: "2", avatar: "https://i.pravatar.cc/40?img=2" },
  { id: "3", avatar: "https://i.pravatar.cc/40?img=3" },
  { id: "4", avatar: "https://i.pravatar.cc/40?img=4" },
  { id: "5", avatar: "https://i.pravatar.cc/40?img=5" },
  { id: "6", avatar: "https://i.pravatar.cc/40?img=6" },
  { id: "7", avatar: "https://i.pravatar.cc/40?img=7" },
];

export const CreateGroupModal = () => {
  const dispatch = useAppDispatch();
  const { activeModal } = useAppSelector((state) => state.modal);
  const isOpen = activeModal === "create-group";

  const [step, setStep] = useState(1);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateGroupFormData>({
    resolver: yupResolver(createGroupSchema),
    defaultValues: {
      name: "",
      coverImage: null,
      location: undefined,
      members: [],
    },
    mode: "onTouched",
  });

  const handleClose = () => {
    dispatch(closeModal());
    reset();
    setSelectedFriends([]);
    setStep(1);
  };

  const handleNext = async () => {
    const fields: (keyof CreateGroupFormData)[] =
      step === 1 ? ["name", "coverImage"] : ["location"];
    const valid = await trigger(fields);
    if (valid) setStep((s) => s + 1);
  };

  const onSubmit = (data: CreateGroupFormData) => {
    const members = MOCK_FRIENDS.filter((f) => selectedFriends.includes(f.id));
    console.warn("Create group:", { ...data, members });
    handleClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      title={
        <ModalHeader
          title={STEP_TITLES[step - 1]}
          step={step}
          totalSteps={TOTAL_STEPS}
          onBack={() => setStep((s) => s - 1)}
        />
      }
      actions={
        <ModalActions
          isLastStep={step === TOTAL_STEPS}
          isSubmitting={isSubmitting}
          onNext={handleNext}
          onClose={handleClose}
        />
      }
    >
      <form id="create-group-form" onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && <StepBasicInfo control={control} errors={errors} />}
        {step === 2 && <StepLocation control={control} errors={errors} />}
        {step === 3 && (
          <StepMembers
            friends={MOCK_FRIENDS}
            selectedIds={selectedFriends}
            onToggle={(id) =>
              setSelectedFriends((prev) =>
                prev.includes(id)
                  ? prev.filter((f) => f !== id)
                  : [...prev, id],
              )
            }
          />
        )}
      </form>
    </Modal>
  );
};
