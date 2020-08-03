import React, { useState, useEffect } from 'react'
import { TextInput, FlatList, View } from 'react-native'

import {Text, ScreenWrapper} from '@shared/components';
import { getUserCategories } from '@shared/firebase';
import { Category } from '@shared/models';

const CategorySearch = () => {
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    async function getCategories(){
      setCategories(await getUserCategories())
    }

    getCategories()
  }, [])

  return(
    <ScreenWrapper>
      <TextInput
        value={search}
        onChangeText={setSearch}
        style={{
          borderBottomColor: 'red',
          borderBottomWidth: 1
        }}
      />
      <FlatList
        data={categories}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item.name}</Text>
            </View>
          )
        }}
      />
    </ScreenWrapper>
  )
}
export default CategorySearch;
