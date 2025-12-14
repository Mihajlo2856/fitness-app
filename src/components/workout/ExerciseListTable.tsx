import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Write from '@/components/common/Write';
// import { TemplateExercise } from '@/services/program.service';
import { TemplateExercise } from '@/types';

interface ExerciseListTableProps {
  exercises: TemplateExercise[];
}

export function ExerciseListTable({ exercises }: ExerciseListTableProps) {
  const { colors } = useTheme();

  if (exercises.length === 0) {
    return (
      <Write className="text-sm text-center py-4" style={{ color: colors.textSecondary }}>
        No exercises in this workout
      </Write>
    );
  }

  return (
    <View>
      <View
        className="flex-row items-center mb-2 pb-2"
        style={{ borderBottomWidth: 1, borderBottomColor: colors.border }}
      >
        <View style={{ width: 40 }}>
          <Write className="text-xs" style={{ color: colors.textSecondary, fontFamily: 'medium' }}>
            #
          </Write>
        </View>
        <View style={{ flex: 1 }}>
          <Write className="text-xs" style={{ color: colors.textSecondary, fontFamily: 'medium' }}>
            Exercise
          </Write>
        </View>
        <View style={{ width: 60 }}>
          <Write className="text-xs text-center" style={{ color: colors.textSecondary, fontFamily: 'medium' }}>
            Sets
          </Write>
        </View>
        <View style={{ width: 60 }}>
          <Write className="text-xs text-center" style={{ color: colors.textSecondary, fontFamily: 'medium' }}>
            Reps
          </Write>
        </View>
      </View>

      {/* Table Rows */}
      {exercises.map((exercise, index) => (
        <View
          key={exercise.id}
          className="flex-row items-center py-3"
          style={{
            borderBottomWidth: index < exercises.length - 1 ? 1 : 0,
            borderBottomColor: colors.border
          }}
        >
          <View style={{ width: 40 }}>
            <Write className="text-sm" style={{ color: colors.textSecondary }}>
              {index + 1}
            </Write>
          </View>
          <View style={{ flex: 1 }}>
            <Write className="text-sm">
              {exercise.exercises?.name || 'Unknown'}
            </Write>
          </View>
          <View style={{ width: 60 }}>
            <Write className="text-sm text-center">
              {exercise.technique === 'hell_set' ? '-' : exercise.sets || '-'}
            </Write>
          </View>
          <View style={{ width: 60 }}>
            <Write className="text-sm text-center">
              {exercise.technique === 'hell_set' ? 'Hell' : exercise.reps || '-'}
            </Write>
          </View>
        </View>
      ))}
    </View>
  );
}