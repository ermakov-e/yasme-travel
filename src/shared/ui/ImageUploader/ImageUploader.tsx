import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { CameraAlt as CameraIcon, Close as CloseIcon } from '@mui/icons-material';

import type { ImageUploaderProps } from './types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const AvatarButton = styled.button<{ $hasImage: boolean; $disabled: boolean }>`
  position: relative;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: none;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  padding: 0;
  background: none;
  flex-shrink: 0;
  outline: none;

  &:focus-visible .avatar-ring {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryBg},
      0 0 0 5px ${({ theme }) => theme.colors.primary};
  }
`;

const AvatarRing = styled.div<{ $hasImage: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background: ${({ theme, $hasImage }) =>
    $hasImage
      ? 'transparent'
      : `linear-gradient(135deg, ${theme.colors.primaryBg} 0%, ${theme.colors.accentLight} 100%)`};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid
    ${({ theme, $hasImage }) =>
      $hasImage ? 'transparent' : theme.colors.border.main};
  transition: border-color ${({ theme }) => theme.transitions.fast};
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const PlaceholderIcon = styled(CameraIcon)`
  font-size: 36px !important;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.8;
`;

const CameraBadge = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.background.paper};
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const CameraBadgeIcon = styled(CameraIcon)`
  font-size: 14px !important;
  color: #fff;
`;

const RemoveBadge = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.error};
  border: 2px solid ${({ theme }) => theme.colors.background.paper};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.errorDark};
  }
`;

const RemoveBadgeIcon = styled(CloseIcon)`
  font-size: 12px !important;
  color: #fff;
`;

const HintText = styled.span`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ErrorText = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.error};
`;

export const ImageUploader = ({
  value,
  onChange,
  accept = 'image/*',
  maxSize = 5,
  disabled = false,
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      setError(null);

      const file = files[0];
      if (!file.type.startsWith('image/')) {
        setError('Выберите файл изображения');
        return;
      }
      if (file.size > maxSize * 1024 * 1024) {
        setError(`Файл не должен превышать ${maxSize}МБ`);
        return;
      }

      const preview = URL.createObjectURL(file);
      onChange?.({ file, preview });
    },
    [maxSize, onChange],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
    e.target.value = '';
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value) URL.revokeObjectURL(value.preview);
    onChange?.(null);
  };

  const handleClick = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  return (
    <Wrapper>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        style={{ display: 'none' }}
        disabled={disabled}
      />

      <AvatarButton
        type="button"
        $hasImage={!!value}
        $disabled={disabled}
        onClick={handleClick}
        aria-label={value ? 'Изменить обложку' : 'Добавить обложку'}
      >
        <AvatarRing className="avatar-ring" $hasImage={!!value}>
          {value ? (
            <AvatarImage src={value.preview} alt="Обложка группы" />
          ) : (
            <PlaceholderIcon />
          )}
        </AvatarRing>

        {!disabled && !value && (
          <CameraBadge>
            <CameraBadgeIcon />
          </CameraBadge>
        )}

        {!disabled && value && (
          <>
            <CameraBadge>
              <CameraBadgeIcon />
            </CameraBadge>
            <RemoveBadge
              onClick={handleRemove}
              aria-label="Удалить обложку"
            >
              <RemoveBadgeIcon />
            </RemoveBadge>
          </>
        )}
      </AvatarButton>

      <HintText>
        {value ? 'Нажмите для замены' : 'Добавить обложку'}
      </HintText>

      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
};
