// BottomSheet.js

import React, {useCallback, useMemo} from 'react';
import {Text, View} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

const BottomSheetQRcode = ({modalRef, snapPoints}) => {
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <View style={{padding: 16}}>
        <Text>Awesome 🎉</Text>
      </View>
    </BottomSheetModal>
  );
};

export default BottomSheetQRcode;
