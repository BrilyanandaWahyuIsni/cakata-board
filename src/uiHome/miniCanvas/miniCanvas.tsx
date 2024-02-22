import { Layer, Stage } from 'react-konva';
import AnotherComponent from '../../canvas/canvas/ArrayComponet/anotherComponent';
import { ReturnBaseStrukturProps } from '../../saveData/baseStruktur';
import LineComponet from '../../canvas/canvas/ArrayComponet/lineComponet';

export default function MiniCanvas({
  data,
}: {
  data: ReturnBaseStrukturProps | null;
}) {
  if (data) {
    return (
      <Stage
        width={300}
        height={200}
        scaleX={0.2}
        scaleY={0.2}
        className="bg-white relative mt-6 rounded-2xl shadow-xl overflow-hidden"
      >
        <Layer>
          <AnotherComponent
            componenCanvas={data.ComponentCanvas}
            draggable={false}
            selectedCmp={null}
            sendIdSelectedCmp={() => {}}
            sendTransformData={() => {}}
          />
        </Layer>
        <Layer>
          <LineComponet lines={data.lines} />
        </Layer>
      </Stage>
    );
  }
}
