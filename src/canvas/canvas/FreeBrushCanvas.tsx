import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import Konva from 'konva';
import {
  ComponenCanvasProps,
  DataImageProps,
  FreeBrushCanvasProps,
  LineProps,
} from './freeBrushCanvasConfig';
import { LineMouseDown, LineMouseMove } from './addComponen/LineConfig';
import uuid4 from 'uuid4';
import LineComponet from './ArrayComponet/lineComponet';
import AnotherComponent from './ArrayComponet/anotherComponent';
import { zoomInOut } from './addComponen/UniversalConfig';
import { AddCircle } from './addComponen/CircleConfig';
import { AddRect } from './addComponen/RectConfig';
import { AddShapeTriagle } from './addComponen/ShapeConfig';
import { AddStar } from './addComponen/StarConfig';
import { AddText } from './addComponen/TextConfig';
import { AddImage } from './addComponen/ImageConfig';
// import { SendNewPosProps } from './ArrayComponet/anotherComponet/RectTransform';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCmp } from '../store/show-clickComponent';
import { StoreStateProps } from '../store';
import MenuCustom, { ChangeDataProps } from '../menu/MenuCustom';
import { ExportTransformProps } from './ArrayComponet/anotherComponet/RectTransform';
import {
  encryptJSON,
  keyNandaBrilyanandaWahyuIsni,
} from '../config/EncripsiData';
import { baseStruktur } from '../../saveData/baseStruktur';
import { saveTextToFile } from '../config/SaveObject';
import { IoIosSave } from 'react-icons/io';
import ShowSaveData from '../menu/ShowSaveData';

function FreeBrushCanvas(props: FreeBrushCanvasProps) {
  const dispactch = useDispatch();
  const modeTypeCanvas = useSelector(
    (state: StoreStateProps) => state.modeCanvas.value,
  );
  const getData = useSelector(
    (state: StoreStateProps) => state.showDataComponent,
  );

  const [componentCanvas, setComponentCanvas] = useState<
    Array<ComponenCanvasProps> | []
  >(props.componentCanvas);

  // line setting
  const [lines, setLines] = useState<Array<LineProps> | []>(props.lines);
  // const [lines, setLines] = useState<Array<LineProps> | []>([]);
  const [addLine, setAddLine] = useState<LineProps | null>(null);
  const lineRef = useRef<Konva.Line>(null);

  // stage setting
  const stageRef = useRef<Konva.Stage>(null);
  const [lastId, setLastId] = useState<string>('');
  const isDrawing = useRef(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputImage, setInputImage] = useState<CanvasImageSource | null>(null);

  const [selectedCmp, setSelectedCmp] = useState<string | null>(null);
  const [showSaveMenu, setShowSaveMenu] = useState<boolean>(false);

  const handleChangeIdSelected = (value: string) => {
    setSelectedCmp(value);
  };

  const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    setLastId(uuid4());

    if (modeTypeCanvas === 'ZOOMIN') {
      handleZoomInOutCanvas({ isZoomIn: true });
    }
    if (modeTypeCanvas === 'ZOOMOUT') {
      handleZoomInOutCanvas({ isZoomIn: false });
    }

    if (modeTypeCanvas === 'BRUSH' || modeTypeCanvas === 'ERASER') {
      isDrawing.current = true;
      const { colorBrush, sizeBrush } = props;
      const addPointLine = LineMouseDown({
        id: lastId,
        brushType: modeTypeCanvas,
        colorBrush,
        eventLine: lineRef,
        eventStage: event,
        sizeBrush,
      });
      if (addPointLine) {
        setAddLine(addPointLine);
      }
    }

    const clickedIsEmpty = event.target === event.target.getStage();
    if (clickedIsEmpty) {
      setSelectedCmp(null);
    }
  };

  const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) {
      return;
    }

    if (modeTypeCanvas === 'BRUSH' || modeTypeCanvas === 'ERASER') {
      const addLinePoint = LineMouseMove(event, lineRef);
      if (addLinePoint) {
        if (addLine) {
          setAddLine(() => ({
            ...addLine,
            points: addLine.points.concat(addLinePoint),
          }));
        }
      }
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    if (addLine) {
      setLines(prev => [...prev, addLine]);
      setAddLine(null);
    }
  };

  const handleWheel = (event: KonvaEventObject<WheelEvent>) => {
    const newScale = zoomInOut(event);
    if (newScale) {
      props.handleSendScale(newScale);
    }
  };

  const handleZoomInOutCanvas = ({ isZoomIn }: { isZoomIn: boolean }) => {
    if (stageRef.current) {
      const stage = stageRef.current.getStage();

      const oldScale = stage.scaleX();
      const getPointerPosition = stage.getPointerPosition();
      if (getPointerPosition) {
        const pos = getPointerPosition;
        const newScale = isZoomIn ? oldScale * 1.1 : oldScale / 1.1;

        const mousePointTo = {
          x: (pos.x - stage.x()) / oldScale,
          y: (pos.y - stage.y()) / oldScale,
        };

        stage.scale({ x: newScale, y: newScale });

        const newPos = {
          x: pos.x - mousePointTo.x * newScale,
          y: pos.y - mousePointTo.y * newScale,
        };

        stage.position(newPos);
        stage.batchDraw();
      }
    }
  };

  const handleDataComponent = (value: ComponenCanvasProps) => {
    setComponentCanvas(prev => [...prev, value]);
    if (modeTypeCanvas === 'IMAGE') {
      setInputImage(null);
    }
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new window.Image();
      if (typeof reader.result === 'string') {
        img.onload = () => {
          // Pastikan gambar telah dimuat sebelum dimasukkan ke dalam KonvaJS
          setInputImage(img);
        };
        img.src = reader.result;
        // setInputImage(img.src);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRalatData = (value: ChangeDataProps) => {
    if (componentCanvas.length > 0) {
      setComponentCanvas(prev => {
        return prev.map(pre => {
          if (pre.data.id === value.id) {
            return {
              type: pre.type,
              data: {
                ...pre.data,
                x:
                  typeof value.posX === 'string'
                    ? parseFloat(value.posX)
                    : value.posX,
                y:
                  typeof value.posY === 'string'
                    ? parseFloat(value.posY)
                    : value.posY,
                fill: value.fill,
                stroke: value.stroke,
                strokeWidth:
                  typeof value.strokeWidth === 'string'
                    ? parseFloat(value.strokeWidth)
                    : value.strokeWidth,
              },
            };
          }
          return pre;
        });
      });
    }
  };

  const handleTransformData = ({
    id: idData,
    pos: posData,
    scale: scaleData,
    rotation: rotationData,
  }: ExportTransformProps) => {
    if (componentCanvas.length > 0) {
      setComponentCanvas(prev => {
        return prev.map(pre => {
          if (pre.data.id === idData) {
            return {
              type: pre.type,
              data: {
                ...pre.data,
                x:
                  typeof posData.x === 'string'
                    ? parseInt(posData.x)
                    : posData.x,
                y:
                  typeof posData.y === 'string'
                    ? parseInt(posData.y)
                    : posData.y,
                scaleX:
                  typeof scaleData.x === 'string'
                    ? parseInt(scaleData.x)
                    : scaleData.x,
                scaleY:
                  typeof scaleData.y === 'string'
                    ? parseInt(scaleData.y)
                    : scaleData.y,
                rotation:
                  typeof rotationData === 'string'
                    ? parseInt(rotationData)
                    : rotationData,
              },
            };
          }
          return pre;
        });
      });
    }
  };

  const handleSaveData = (e: string) => {
    const saveComponent = componentCanvas.map(e => {
      if (e.type === 'IMAGE') {
        const imgSrc = (e.data as DataImageProps).image;
        return {
          type: e.type,
          data: {
            ...e.data,
            image: imgSrc.src as never,
          },
        };
      } else {
        return e;
      }
    });

    const jsonData = baseStruktur({
      componentCanvas: saveComponent,
      lines: lines,
    });
    const data = encryptJSON(jsonData, keyNandaBrilyanandaWahyuIsni);
    saveTextToFile({ textToSave: data, nameFile: e });
    setShowSaveMenu(false);
  };

  const handleUpComponent = () => {
    setComponentCanvas(prev => [
      ...prev.filter(e => {
        if (e.data.id !== selectedCmp) {
          return e;
        }
      }),
      ...prev.filter(ev => {
        if (ev.data.id === selectedCmp) {
          return ev;
        }
      }),
    ]);
  };
  const handleDownComponent = () => {
    setComponentCanvas(prev => [
      ...prev.filter(e => {
        if (e.data.id === selectedCmp) {
          return e;
        }
      }),
      ...prev.filter(ev => {
        if (ev.data.id !== selectedCmp) {
          return ev;
        }
      }),
    ]);
  };

  useEffect(() => {
    const changeKeyDown = (event: KeyboardEvent) => {
      if (modeTypeCanvas !== 'TEXT' && modeTypeCanvas !== 'SETTING') {
        if (event.key === '=') {
          handleZoomInOutCanvas({ isZoomIn: true });
        }
        if (event.key === '-') {
          handleZoomInOutCanvas({ isZoomIn: false });
        }
      }

      if (
        event.key === 'Delete' &&
        selectedCmp !== null &&
        modeTypeCanvas === 'SELECT'
      ) {
        setComponentCanvas(prev =>
          prev.filter(e => {
            if (e.data.id !== selectedCmp) {
              return e;
            }
          }),
        );
      }
    };

    window.addEventListener('keydown', changeKeyDown);

    if (modeTypeCanvas === 'IMAGE') {
      if (inputRef.current) {
        inputRef.current.click();
      }
    }
    if (modeTypeCanvas !== 'SELECT') {
      dispactch(setShowCmp({ value: false }));
    }

    return () => {
      window.removeEventListener('keydown', changeKeyDown);
    };
  }, [dispactch, modeTypeCanvas, selectedCmp]);

  return (
    <>
      {showSaveMenu && (
        <ShowSaveData
          handleCancelSave={() => setShowSaveMenu(false)}
          handleSave={handleSaveData}
        />
      )}
      <button
        type="button"
        className="absolute bottom-3 right-3 p-3 text-stone-50 bg-slate-500 hover:bg-slate-400 z-30 rounded-full"
        onClick={() => setShowSaveMenu(true)}
      >
        <IoIosSave size={20} />
      </button>
      <input
        onChange={handleChangeInput}
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
      />
      {getData.value &&
        selectedCmp &&
        componentCanvas.map(e => {
          if (e.data.id === selectedCmp) {
            return (
              <MenuCustom
                handleDownComponent={handleDownComponent}
                handleUpComponent={handleUpComponent}
                handleRalatData={handleRalatData}
                componentData={e.data}
              />
            );
          }
        })}

      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onWheel={handleWheel}
        draggable={modeTypeCanvas === 'PAN'}
        ref={stageRef}
      >
        <Layer>
          <AnotherComponent
            sendTransformData={handleTransformData}
            sendIdSelectedCmp={handleChangeIdSelected}
            selectedCmp={selectedCmp}
            componenCanvas={componentCanvas}
            draggable={modeTypeCanvas === 'SELECT'}
          />
          {modeTypeCanvas === 'CIRCLE' && (
            <AddCircle
              stageRef={stageRef}
              sendDataCircle={handleDataComponent}
            />
          )}
          {modeTypeCanvas === 'RECT' && (
            <AddRect stageRef={stageRef} sendDataRect={handleDataComponent} />
          )}
          {modeTypeCanvas === 'TRIAGLE' && (
            <AddShapeTriagle
              stageRef={stageRef}
              sendDataShape={handleDataComponent}
            />
          )}
          {modeTypeCanvas === 'STAR' && (
            <AddStar stageRef={stageRef} sendDataStar={handleDataComponent} />
          )}
          {modeTypeCanvas === 'TEXT' && (
            <AddText stageRef={stageRef} sendDataText={handleDataComponent} />
          )}
          {modeTypeCanvas === 'IMAGE' && inputImage && (
            <AddImage image={inputImage} sendDataImage={handleDataComponent} />
          )}
        </Layer>
        <Layer>
          <LineComponet lines={lines} />
          <Line
            key={'ini_spesial'}
            points={addLine?.points}
            stroke={addLine?.stroke}
            strokeWidth={addLine?.strokeWidth}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation={addLine?.modeCanvas}
            ref={lineRef}
          />
        </Layer>
      </Stage>
    </>
  );
}

export default FreeBrushCanvas;
