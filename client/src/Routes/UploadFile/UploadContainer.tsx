import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import useInput from "Hooks/useInput";
import UploadPresenter from "./UploadPresenter";
import { CREATE_FILE, CREATE_POST } from "./UploadQueries";

export default () => {
  const [file, setFile] = useState();
  const [fileId, setFileId] = useState("");
  const title = useInput("");
  const content = useInput("");
  const [createPost] = useMutation(CREATE_POST);
  const [createFile, { loading }] = useMutation(CREATE_FILE, {
    // tslint:disable-next-line:no-shadowed-variable
    onCompleted({ createFile }) {
      setFileId(createFile.id);
    }
  });

  // const onDrop = useCallback(
  //   // tslint:disable-next-line:no-shadowed-variable
  //   async ([file]) => {
  //     await setFile(file);
  //     // const reader = new FileReader();
  //     // reader.addEventListener(
  //     //   "load",
  //     //   () => {
  //     // console.log(reader.result);
  //     // setImgSrc(reader.result);
  //     //   },
  //     //   false
  //     // );
  //     // reader.readAsDataURL(file);
  //   },
  //   [createFile]
  // );

  // tslint:disable-next-line:no-shadowed-variable
  const onDrop = async ([file]) => {
    await setFile(file);
    createFile({
      variables: {
        file
      }
    });
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const onSubmit = async e => {
    e.preventDefault();
    if (fileId !== "" && title.value !== "" && content.value !== "") {
      createPost({
        variables: {
          title: title.value,
          content: content.value,
          fileId
        }
      });
      window.location.replace("/");
    } else if (file === "") {
      toast.error("동영상을 넣어주세요");
    } else {
      toast.error("상세정보를 완전히 작성해 주세요");
    }
  };
  return (
    <UploadPresenter
      onSubmit={onSubmit}
      onDrop={onDrop}
      getRootProps={getRootProps}
      getInputProps={getInputProps}
      isDragActive={isDragActive}
      file={file}
      loading={loading}
      title={title}
      content={content}
    />
  );
};
